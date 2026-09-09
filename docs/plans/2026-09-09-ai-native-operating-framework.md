# AceMode AI Native Operating Framework Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Turn the v0.1 asset-governance repository into a complete organization-level operating framework for the AI Transformation Lead, grounded in the available AceMode records without prematurely defining department-specific functions.

**Architecture:** Keep GitHub as the versioned control plane. Separate verified context, governance rules, decisions, initiatives, and reusable execution assets. Add a Leader-facing control surface that shows direction, ownership, maturity, open decisions, and evidence without copying transient chat or task data into durable context.

**Tech Stack:** Markdown, JSON catalog contracts, Node.js repository validator, Node.js tests.

---

### Task 1: Record the evidence boundary

**Files:**
- Create: `context/sources/wechat-summary-2026-09-09.md`
- Modify: `brain/catalog.json`

1. Convert the supplied chat summary into a source note that records scope, authority, confirmed statements, observations, and missing evidence.
2. Register the source note as internal context.
3. Keep unsupported role authority, security policy, and brand details explicitly unresolved.

### Task 2: Build the organization context

**Files:**
- Create: `context/organization/identity.md`
- Modify: `context/organization/mission.md`
- Modify: `context/organization/team-map.md`
- Create: `context/transformation/ai-native-charter.md`
- Create: `context/transformation/current-portfolio.md`
- Modify: `context/brand/voice.md`
- Modify: `brain/catalog.json`

1. Write the verified AceMode identity, audience, value proposition, and slogan.
2. Refresh the mission and team map from the supplied evidence.
3. Define the transformation charter at organization level.
4. Record self-media operations as the first pilot, while keeping implementation details outside the top-level framework.
5. Keep brand voice as draft until a brand approver confirms examples and prohibited claims.

### Task 3: Add the Leader operating framework

**Files:**
- Create: `governance/OPERATING_MODEL.md`
- Create: `governance/ROLES_AND_DECISIONS.md`
- Create: `governance/KNOWLEDGE_GOVERNANCE.md`
- Create: `governance/ADOPTION_LIFECYCLE.md`
- Create: `governance/MEASUREMENT.md`
- Create: `brain/LEADER_DASHBOARD.md`
- Create: `brain/OPEN_DECISIONS.md`

1. Define the organization loop: direction, evidence, initiative, capability, controlled execution, measurement, learning.
2. Define accountable roles and provisional decision rights.
3. Define how chat and other sources become governed knowledge.
4. Define department onboarding and pilot promotion/rollback stages.
5. Define a small scorecard and the Leader review cadence.
6. Record unresolved organization decisions visibly.

### Task 4: Align repository contracts and navigation

**Files:**
- Modify: `README.md`
- Modify: `AGENTS.md`
- Modify: `brain/README.md`
- Modify: `context/README.md`
- Create: `docs/decisions/0002-organization-operating-framework.md`
- Modify: `docs/plans/2026-09-02-brain-and-skill-design.md`

1. Make the organization framework the repository entry point.
2. Preserve the existing Context/Skill/Workflow/Tool/Human Gate/Eval boundary.
3. Supersede the old livestream-first assumption with the confirmed self-media pilot.
4. Document the decision and migration consequences.

### Task 5: Strengthen validation

**Files:**
- Modify: `scripts/validate-repo.mjs`
- Modify: `tests/validate-repo.test.mjs`

1. Require the Leader dashboard and core organization governance files.
2. Require active context sources to use an explicit stable source identifier.
3. Add tests proving the complete framework passes and missing Leader control files fail.
4. Run `npm test` and `npm run check`.
