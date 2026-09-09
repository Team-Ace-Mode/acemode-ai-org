# ADR-0001: GitHub Brain with Separate Skill Contracts

日期：2026-09-02
状态：Accepted for v0.1

## Context

AceMode 需要让团队成员电脑上的 Agent 使用统一 Context 和 Skill，同时为未来 AWS 云端 Runner 保留自动执行能力。当前没有组织级 Brain 仓库，现有知识主要分散在人、聊天、飞书/Notion 和生产系统中。

## Options Considered

1. 只做一个自由格式 Markdown 知识库：启动快，但无法检查 Owner、时效、权限、Gate 和 Eval，容易退化为 Prompt 堆。
2. 立即建设中心化数据库和云端 Agent 平台：自动化能力强，但在流程尚未验证时会固化错误，并扩大权限和运维成本。
3. GitHub 作为资产控制面，Markdown 给 Agent 阅读，JSON 合同给 CI/Runner 校验，本地先验证、云端后接。

## Decision

选择方案 3。Context、Skill、Workflow、Tool、Human Gate 和 Eval 分层管理；`SKILL.md` 只承载可复用方法，`skill.json` 承载治理元数据；本地 Agent 与未来云端 Runner 使用同一份版本化资产。

## Consequences

- 部门可以贡献业务方法，但 Active 升级必须经过案例、Pilot、Approver 和自动校验。
- 开发无需先搭完整平台，可以先实现 Tool、校验和最小运行适配。
- GitHub 不成为所有业务数据的 source of truth；它保存 Agent 可用的核验快照和引用。
- 未来云端自动化必须读取固定 commit/version，不能隐式使用未审核的最新 Draft。
