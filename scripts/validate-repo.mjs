import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const REQUIRED_DIRECTORIES = [
  "brain",
  "context",
  "skills",
  "workflows",
  "tools",
  "evals",
  "governance",
  "schemas",
  "scripts",
  "tests",
];

const REQUIRED_FILES = ["README.md", "AGENTS.md", ".gitignore"];
const REQUIRED_ORGANIZATION_FILES = [
  "brain/LEADER_DASHBOARD.md",
  "brain/OPEN_DECISIONS.md",
  "governance/OPERATING_MODEL.md",
  "governance/ROLES_AND_DECISIONS.md",
  "governance/KNOWLEDGE_GOVERNANCE.md",
  "governance/ADOPTION_LIFECYCLE.md",
  "governance/MEASUREMENT.md",
];
const SKILL_STATUSES = new Set(["draft", "pilot", "active", "deprecated"]);
const CONTEXT_STATUSES = new Set(["draft", "active", "stale", "archived"]);
const SENSITIVITIES = new Set(["public", "internal", "restricted"]);
const SIDE_EFFECTS = new Set([
  "read_only",
  "internal_write",
  "external_write",
  "destructive",
]);
const MODEL_NAME_PATTERN =
  /\b(?:claude|sonnet|opus|haiku|gpt(?:-[\w.]+)?|gemini|openrouter|bedrock|deepseek|qwen|kimi)\b/iu;
const PRIVATE_KEY_PATTERN = /-----BEGIN [A-Z ]*PRIVATE KEY-----/u;
const AWS_ACCESS_KEY_PATTERN = /\bAKIA[0-9A-Z]{16}\b/u;
const API_KEY_PATTERN = /\bsk-[A-Za-z0-9_-]{20,}\b/u;

async function exists(target) {
  try {
    await stat(target);
    return true;
  } catch {
    return false;
  }
}

async function readJson(target, errors, label) {
  try {
    return JSON.parse(await readFile(target, "utf8"));
  } catch (error) {
    errors.push(`${label} is not valid JSON: ${error.message}`);
    return null;
  }
}

function parseFrontmatter(content, relativePath, errors, documentName) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/u);
  if (!match) {
    errors.push(`${relativePath}: ${documentName} must begin with YAML frontmatter`);
    return null;
  }

  const values = {};
  for (const rawLine of match[1].split(/\r?\n/u)) {
    const line = rawLine.trim();
    if (!line) continue;
    const separator = line.indexOf(":");
    if (separator < 1) {
      errors.push(`${relativePath}: unsupported frontmatter line: ${rawLine}`);
      continue;
    }
    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim().replace(/^['"]|['"]$/gu, "");
    values[key] = value;
  }
  return values;
}

function parseSkillFrontmatter(content, relativePath, errors) {
  const values = parseFrontmatter(content, relativePath, errors, "SKILL.md");
  if (!values) return null;
  const keys = Object.keys(values).sort();
  if (keys.join(",") !== "description,name") {
    errors.push(
      `${relativePath}: SKILL.md frontmatter may contain only name and description`,
    );
  }
  if (!values.name || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/u.test(values.name)) {
    errors.push(`${relativePath}: skill name must be a lowercase kebab-case slug`);
  }
  if (!values.description?.startsWith("Use when ")) {
    errors.push(`${relativePath}: description must start with "Use when "`);
  }
  return values;
}

async function listDirectories(target) {
  if (!(await exists(target))) return [];
  const entries = await readdir(target, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("_"))
    .map((entry) => entry.name)
    .sort();
}

async function walkFiles(target, root = target) {
  if (!(await exists(target))) return [];
  const entries = await readdir(target, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if ([".git", "node_modules"].includes(entry.name)) continue;
    const absolute = path.join(target, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walkFiles(absolute, root)));
    } else if (entry.isFile()) {
      files.push({ absolute, relative: path.relative(root, absolute) });
    }
  }
  return files;
}

function hasRequiredGate(metadata) {
  return (
    Array.isArray(metadata.humanGates) &&
    metadata.humanGates.some(
      (gate) => gate && gate.required === true && typeof gate.before === "string",
    )
  );
}

function requireFields(value, fields, label, errors) {
  for (const field of fields) {
    if (value?.[field] === undefined || value?.[field] === "") {
      errors.push(`${label}: missing required field ${field}`);
    }
  }
}

export async function validateRepository(root, options = {}) {
  const errors = [];
  const warnings = [];
  const now = options.now ? new Date(options.now) : new Date();

  for (const relativePath of REQUIRED_FILES) {
    if (!(await exists(path.join(root, relativePath)))) {
      errors.push(`missing required file: ${relativePath}`);
    }
  }
  for (const relativePath of REQUIRED_ORGANIZATION_FILES) {
    if (!(await exists(path.join(root, relativePath)))) {
      errors.push(`missing required organization file: ${relativePath}`);
    }
  }
  for (const relativePath of REQUIRED_DIRECTORIES) {
    if (!(await exists(path.join(root, relativePath)))) {
      errors.push(`missing required directory: ${relativePath}`);
    }
  }

  const catalogPath = path.join(root, "brain", "catalog.json");
  const catalog = (await exists(catalogPath))
    ? await readJson(catalogPath, errors, "brain/catalog.json")
    : null;
  if (!catalog) {
    errors.push("missing or unreadable brain/catalog.json");
  }

  const contextIds = new Set();
  const contextPaths = new Map();
  if (catalog) {
    if (catalog.schemaVersion !== 1 || !Array.isArray(catalog.records)) {
      errors.push("brain/catalog.json: expected schemaVersion 1 and records array");
    } else {
      for (const record of catalog.records) {
        const label = `context record ${record?.id ?? "<unknown>"}`;
        requireFields(
          record,
          [
            "id",
            "path",
            "owner",
            "status",
            "source",
            "verifiedAt",
            "reviewAfter",
            "sensitivity",
          ],
          label,
          errors,
        );
        if (contextIds.has(record.id)) errors.push(`${label}: duplicate id`);
        contextIds.add(record.id);
        if (!CONTEXT_STATUSES.has(record.status)) {
          errors.push(`${label}: invalid status ${record.status}`);
        }
        if (!SENSITIVITIES.has(record.sensitivity)) {
          errors.push(`${label}: invalid sensitivity ${record.sensitivity}`);
        }
        if (
          record.status === "active" &&
          /^(?:unknown|pending|chat|wechat|meeting)$/iu.test(record.source ?? "")
        ) {
          errors.push(`${label}: active context requires a stable source identifier`);
        }
        const normalizedPath = path.normalize(record.path ?? "");
        const contextPrefix = `context${path.sep}`;
        if (
          normalizedPath.startsWith(`..${path.sep}`) ||
          (!normalizedPath.startsWith(contextPrefix) && normalizedPath !== "context")
        ) {
          errors.push(`${label}: path must stay inside context/`);
        } else {
          if (contextPaths.has(normalizedPath)) {
            errors.push(
              `${label}: context path is already registered by ${contextPaths.get(normalizedPath)}`,
            );
          } else {
            contextPaths.set(normalizedPath, record.id);
          }

          const contextPath = path.join(root, normalizedPath);
          if (!(await exists(contextPath))) {
            errors.push(`${label}: missing context file ${record.path}`);
          } else if (path.extname(contextPath).toLowerCase() === ".md") {
            const frontmatter = parseFrontmatter(
              await readFile(contextPath, "utf8"),
              record.path,
              errors,
              "Context file",
            );
            const expectedValues = {
              id: record.id,
              owner: record.owner,
              status: record.status,
              source: record.source,
              verified_at: record.verifiedAt,
              review_after: record.reviewAfter,
              sensitivity: record.sensitivity,
            };
            for (const [field, expectedValue] of Object.entries(expectedValues)) {
              if (frontmatter && frontmatter[field] !== expectedValue) {
                errors.push(
                  `${record.path}: frontmatter ${field} must match catalog value ${expectedValue}`,
                );
              }
            }
          }
        }
        const reviewAfter = new Date(record.reviewAfter);
        if (!Number.isNaN(reviewAfter.valueOf()) && reviewAfter < now) {
          warnings.push(`${label}: review date has passed (${record.reviewAfter})`);
        }
      }
    }
  }

  const contextRoot = path.join(root, "context");
  for (const file of await walkFiles(contextRoot)) {
    if (path.extname(file.relative).toLowerCase() !== ".md") continue;
    const pathSegments = file.relative.split(path.sep);
    if (
      file.relative === "README.md" ||
      pathSegments.some((segment) => segment.startsWith("_"))
    ) {
      continue;
    }
    const catalogPath = path.normalize(path.join("context", file.relative));
    if (!contextPaths.has(catalogPath)) {
      errors.push(
        `${catalogPath}: context file is not registered in brain/catalog.json`,
      );
    }
  }

  const toolsById = new Map();
  for (const directory of await listDirectories(path.join(root, "tools"))) {
    const relativePath = `tools/${directory}/tool.json`;
    const target = path.join(root, relativePath);
    if (!(await exists(target))) {
      errors.push(`${relativePath}: missing tool contract`);
      continue;
    }
    const tool = await readJson(target, errors, relativePath);
    if (!tool) continue;
    requireFields(
      tool,
      ["schemaVersion", "id", "name", "sideEffect", "auth", "approval"],
      relativePath,
      errors,
    );
    if (tool.id !== directory) {
      errors.push(`${relativePath}: id must match directory name`);
    }
    if (toolsById.has(tool.id)) errors.push(`${relativePath}: duplicate tool id`);
    if (!SIDE_EFFECTS.has(tool.sideEffect)) {
      errors.push(`${relativePath}: invalid sideEffect ${tool.sideEffect}`);
    }
    if (["external_write", "destructive"].includes(tool.sideEffect) && tool.approval !== "required") {
      errors.push(`${relativePath}: risky tools must require approval`);
    }
    toolsById.set(tool.id, tool);
  }

  const skillsById = new Map();
  for (const directory of await listDirectories(path.join(root, "skills"))) {
    const skillDirectory = path.join(root, "skills", directory);
    const markdownRelative = `skills/${directory}/SKILL.md`;
    const metadataRelative = `skills/${directory}/skill.json`;
    const markdownPath = path.join(skillDirectory, "SKILL.md");
    const metadataPath = path.join(skillDirectory, "skill.json");
    if (!(await exists(markdownPath))) {
      errors.push(`${markdownRelative}: missing skill guidance`);
      continue;
    }
    if (!(await exists(metadataPath))) {
      errors.push(`${metadataRelative}: missing skill governance metadata`);
      continue;
    }

    const markdown = await readFile(markdownPath, "utf8");
    const frontmatter = parseSkillFrontmatter(markdown, markdownRelative, errors);
    if (frontmatter?.name !== directory) {
      errors.push(`${markdownRelative}: frontmatter name must match directory name`);
    }
    if (MODEL_NAME_PATTERN.test(markdown)) {
      errors.push(
        `${markdownRelative}: model-specific guidance belongs in runtime policy, not a reusable skill`,
      );
    }

    const metadata = await readJson(metadataPath, errors, metadataRelative);
    if (!metadata) continue;
    requireFields(
      metadata,
      [
        "schemaVersion",
        "id",
        "version",
        "status",
        "owner",
        "approver",
        "riskLevel",
        "context",
        "tools",
        "humanGates",
        "evals",
      ],
      metadataRelative,
      errors,
    );
    if (metadata.id !== directory) {
      errors.push(`${metadataRelative}: id must match directory name`);
    }
    if (!SKILL_STATUSES.has(metadata.status)) {
      errors.push(`${metadataRelative}: invalid status ${metadata.status}`);
    }
    if (!/^\d+\.\d+\.\d+$/u.test(metadata.version ?? "")) {
      errors.push(`${metadataRelative}: version must use semantic versioning`);
    }
    for (const contextId of metadata.context ?? []) {
      if (!contextIds.has(contextId)) {
        errors.push(`${metadataRelative}: unknown context id ${contextId}`);
      }
    }
    let usesRiskyTool = false;
    for (const toolId of metadata.tools ?? []) {
      const tool = toolsById.get(toolId);
      if (!tool) {
        errors.push(`${metadataRelative}: unknown tool id ${toolId}`);
        continue;
      }
      if (["external_write", "destructive"].includes(tool.sideEffect)) {
        usesRiskyTool = true;
      }
    }
    if (usesRiskyTool && !hasRequiredGate(metadata)) {
      errors.push(`${metadataRelative}: external-write tool requires a human gate`);
    }
    if (metadata.status === "active" && !(metadata.evals?.length > 0)) {
      errors.push(`${metadataRelative}: active skill must reference at least one eval`);
    }
    if (
      ["pilot", "active"].includes(metadata.status) &&
      !(metadata.evals?.length >= 3)
    ) {
      errors.push(
        `${metadataRelative}: pilot and active skills must reference at least three evals`,
      );
    }
    for (const evalId of metadata.evals ?? []) {
      const evalPath = path.join(root, "evals", ...evalId.split("/")) + ".json";
      if (!(await exists(evalPath))) {
        errors.push(`${metadataRelative}: missing eval ${evalId}`);
      } else {
        const evalRecord = await readJson(
          evalPath,
          errors,
          path.relative(root, evalPath),
        );
        if (evalRecord && evalRecord.skillId !== metadata.id) {
          errors.push(`${metadataRelative}: eval ${evalId} points to another skill`);
        }
      }
    }
    skillsById.set(metadata.id, metadata);
  }

  for (const file of await walkFiles(root)) {
    const basename = path.basename(file.relative);
    if (/^\.env(?:\..+)?$/u.test(basename) && !basename.endsWith(".example")) {
      errors.push(`${file.relative}: secret-bearing file must not be committed`);
    }
    const fileStat = await stat(file.absolute);
    if (fileStat.size > 1_000_000) continue;
    let content;
    try {
      content = await readFile(file.absolute, "utf8");
    } catch {
      continue;
    }
    if (PRIVATE_KEY_PATTERN.test(content)) {
      errors.push(`${file.relative}: private key material must not be committed`);
    }
    if (AWS_ACCESS_KEY_PATTERN.test(content) || API_KEY_PATTERN.test(content)) {
      errors.push(`${file.relative}: probable API credential must not be committed`);
    }
  }

  return {
    errors: [...new Set(errors)].sort(),
    summary: {
      contextRecords: contextIds.size,
      skills: skillsById.size,
      tools: toolsById.size,
    },
    warnings: [...new Set(warnings)].sort(),
  };
}

async function main() {
  const root = path.resolve(process.argv[2] ?? process.cwd());
  const result = await validateRepository(root);
  for (const warning of result.warnings) console.warn(`WARN ${warning}`);
  for (const error of result.errors) console.error(`ERROR ${error}`);
  console.log(
    `Validated ${result.summary.contextRecords} context records, ${result.summary.skills} skills, and ${result.summary.tools} tools.`,
  );
  process.exitCode = result.errors.length === 0 ? 0 : 1;
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  await main();
}
