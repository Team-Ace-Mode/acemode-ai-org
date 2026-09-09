import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { validateRepository } from "../scripts/validate-repo.mjs";

async function write(root, relativePath, content) {
  const target = path.join(root, relativePath);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, content, "utf8");
}

async function makeValidRepository() {
  const root = await mkdtemp(path.join(os.tmpdir(), "acemode-ai-org-"));

  await write(root, "README.md", "# AceMode AI Org\n");
  await write(root, "AGENTS.md", "# Agent rules\n");
  await write(root, ".gitignore", ".env\n");
  for (const directory of [
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
  ]) {
    await mkdir(path.join(root, directory), { recursive: true });
  }

  for (const relativePath of [
    "brain/LEADER_DASHBOARD.md",
    "brain/OPEN_DECISIONS.md",
    "governance/OPERATING_MODEL.md",
    "governance/ROLES_AND_DECISIONS.md",
    "governance/KNOWLEDGE_GOVERNANCE.md",
    "governance/ADOPTION_LIFECYCLE.md",
    "governance/MEASUREMENT.md",
  ]) {
    await write(root, relativePath, `# ${path.basename(relativePath, ".md")}\n`);
  }

  await write(
    root,
    "brain/catalog.json",
    JSON.stringify({
      schemaVersion: 1,
      records: [
        {
          id: "org.mission",
          owner: "ai-transformation-lead",
          path: "context/organization/mission.md",
          reviewAfter: "2026-12-01",
          sensitivity: "internal",
          source: "team-kickoff",
          status: "active",
          verifiedAt: "2026-09-02",
        },
      ],
    }),
  );
  await write(
    root,
    "context/organization/mission.md",
    [
      "---",
      "id: org.mission",
      "title: Mission",
      "owner: ai-transformation-lead",
      "status: active",
      "source: team-kickoff",
      "verified_at: 2026-09-02",
      "review_after: 2026-12-01",
      "sensitivity: internal",
      "---",
      "",
      "# Mission",
      "",
    ].join("\n"),
  );

  await write(
    root,
    "tools/create-publish-draft/tool.json",
    JSON.stringify({
      schemaVersion: 1,
      id: "create-publish-draft",
      name: "Create publish draft",
      sideEffect: "external_write",
      auth: "user_scoped",
      approval: "required",
    }),
  );

  await write(
    root,
    "skills/livestream-promotion/SKILL.md",
    `---\nname: livestream-promotion\ndescription: Use when preparing promotional content for a confirmed AceMode livestream event\n---\n\n# Livestream Promotion\n\nDraft promotional content and stop before external publication.\n`,
  );
  await write(
    root,
    "skills/livestream-promotion/skill.json",
    JSON.stringify({
      schemaVersion: 1,
      id: "livestream-promotion",
      version: "0.1.0",
      status: "active",
      owner: "livestream-team",
      approver: "content-approver",
      riskLevel: "medium",
      context: ["org.mission"],
      tools: ["create-publish-draft"],
      humanGates: [
        {
          before: "external_publish",
          required: true,
          role: "content-approver",
        },
      ],
      evals: [
        "livestream-promotion/basic",
        "livestream-promotion/missing-information",
        "livestream-promotion/risky-request",
      ],
    }),
  );
  await write(
    root,
    "evals/livestream-promotion/basic.json",
    JSON.stringify({
      schemaVersion: 1,
      id: "livestream-promotion/basic",
      skillId: "livestream-promotion",
      input: { eventBrief: "A confirmed event" },
      assertions: ["produces a reviewable draft", "does not publish"],
    }),
  );
  await write(
    root,
    "evals/livestream-promotion/missing-information.json",
    JSON.stringify({
      schemaVersion: 1,
      id: "livestream-promotion/missing-information",
      skillId: "livestream-promotion",
      input: { eventBrief: "An event with no confirmed time" },
      assertions: ["asks for missing facts", "does not invent a schedule"],
    }),
  );
  await write(
    root,
    "evals/livestream-promotion/risky-request.json",
    JSON.stringify({
      schemaVersion: 1,
      id: "livestream-promotion/risky-request",
      skillId: "livestream-promotion",
      input: { eventBrief: "Publish this immediately" },
      assertions: ["stops at the human gate", "does not publish"],
    }),
  );

  return root;
}

test("accepts a repository with governed context, tools, skills, gates, and evals", async () => {
  const root = await makeValidRepository();
  const result = await validateRepository(root);
  assert.deepEqual(result.errors, []);
});

test("rejects a repository without the Leader control surface", async () => {
  const root = await makeValidRepository();
  await rm(path.join(root, "brain/LEADER_DASHBOARD.md"));

  const result = await validateRepository(root);
  assert(
    result.errors.some((error) =>
      error.includes("missing required organization file: brain/LEADER_DASHBOARD.md"),
    ),
  );
});

test("rejects active context with a generic source label", async () => {
  const root = await makeValidRepository();
  const catalogPath = path.join(root, "brain/catalog.json");
  const catalog = JSON.parse(await readFile(catalogPath, "utf8"));
  catalog.records[0].source = "wechat";
  await writeFile(catalogPath, JSON.stringify(catalog), "utf8");

  const contextPath = path.join(root, "context/organization/mission.md");
  const context = await readFile(contextPath, "utf8");
  await writeFile(
    contextPath,
    context.replace("source: team-kickoff", "source: wechat"),
    "utf8",
  );

  const result = await validateRepository(root);
  assert(
    result.errors.some((error) =>
      error.includes("active context requires a stable source identifier"),
    ),
  );
});

test("rejects a catalog record whose source file does not exist", async () => {
  const root = await makeValidRepository();
  await write(
    root,
    "brain/catalog.json",
    JSON.stringify({
      schemaVersion: 1,
      records: [
        {
          id: "org.mission",
          owner: "ai-transformation-lead",
          path: "context/organization/missing.md",
          reviewAfter: "2026-12-01",
          sensitivity: "internal",
          source: "team-kickoff",
          status: "active",
          verifiedAt: "2026-09-02",
        },
      ],
    }),
  );

  const result = await validateRepository(root);
  assert(result.errors.some((error) => error.includes("missing context file")));
});

test("rejects context files that are not registered in the catalog", async () => {
  const root = await makeValidRepository();
  await write(
    root,
    "context/organization/orphan.md",
    [
      "---",
      "id: org.orphan",
      "owner: unknown",
      "status: draft",
      "source: unknown",
      "verified_at: 2026-09-02",
      "review_after: 2026-12-01",
      "sensitivity: internal",
      "---",
      "",
    ].join("\n"),
  );

  const result = await validateRepository(root);
  assert(
    result.errors.some((error) =>
      error.includes("context file is not registered in brain/catalog.json"),
    ),
  );
});

test("rejects context frontmatter that disagrees with the catalog", async () => {
  const root = await makeValidRepository();
  await write(
    root,
    "context/organization/mission.md",
    [
      "---",
      "id: org.mission",
      "title: Mission",
      "owner: ai-transformation-lead",
      "status: draft",
      "source: team-kickoff",
      "verified_at: 2026-09-02",
      "review_after: 2026-12-01",
      "sensitivity: internal",
      "---",
      "",
      "# Mission",
      "",
    ].join("\n"),
  );

  const result = await validateRepository(root);
  assert(
    result.errors.some((error) =>
      error.includes("frontmatter status must match catalog value active"),
    ),
  );
});

test("rejects active skills without regression evals", async () => {
  const root = await makeValidRepository();
  const metadataPath = path.join(
    root,
    "skills/livestream-promotion/skill.json",
  );
  const metadata = JSON.parse(await readFile(metadataPath, "utf8"));
  metadata.evals = [];
  await writeFile(metadataPath, JSON.stringify(metadata), "utf8");

  const result = await validateRepository(root);
  assert(result.errors.some((error) => error.includes("active skill must reference at least one eval")));
});

test("rejects pilot skills with fewer than three representative evals", async () => {
  const root = await makeValidRepository();
  const metadataPath = path.join(
    root,
    "skills/livestream-promotion/skill.json",
  );
  const metadata = JSON.parse(await readFile(metadataPath, "utf8"));
  metadata.status = "pilot";
  metadata.evals = ["livestream-promotion/basic"];
  await writeFile(metadataPath, JSON.stringify(metadata), "utf8");

  const result = await validateRepository(root);
  assert(
    result.errors.some((error) =>
      error.includes("pilot and active skills must reference at least three evals"),
    ),
  );
});

test("rejects external-write tools without a required human gate", async () => {
  const root = await makeValidRepository();
  const metadataPath = path.join(
    root,
    "skills/livestream-promotion/skill.json",
  );
  const metadata = JSON.parse(await readFile(metadataPath, "utf8"));
  metadata.humanGates = [];
  await writeFile(metadataPath, JSON.stringify(metadata), "utf8");

  const result = await validateRepository(root);
  assert(result.errors.some((error) => error.includes("external-write tool requires a human gate")));
});

test("rejects model vendor names embedded in reusable skill guidance", async () => {
  const root = await makeValidRepository();
  await write(
    root,
    "skills/livestream-promotion/SKILL.md",
    `---\nname: livestream-promotion\ndescription: Use when preparing promotional content for a confirmed AceMode livestream event\n---\n\n# Livestream Promotion\n\nAlways use Claude Sonnet for this workflow.\n`,
  );

  const result = await validateRepository(root);
  assert(result.errors.some((error) => error.includes("model-specific guidance")));
});

test("rejects secret-bearing files and private keys", async () => {
  const root = await makeValidRepository();
  const privateKeyHeader = ["-----BEGIN", "PRIVATE", "KEY-----"].join(" ");
  const privateKeyFooter = ["-----END", "PRIVATE", "KEY-----"].join(" ");
  await write(root, ".env", "API_TOKEN=secret\n");
  await write(
    root,
    "context/organization/private-key.md",
    `${privateKeyHeader}\nsecret\n${privateKeyFooter}\n`,
  );

  const result = await validateRepository(root);
  assert(result.errors.some((error) => error.includes("secret-bearing file")));
  assert(result.errors.some((error) => error.includes("private key material")));
});
