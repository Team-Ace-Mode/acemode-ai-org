# AceMode AI Native Organization

这是 AceMode 推进组织 AI Native 化的版本化控制面。它帮助 Founder、AI Transformation Lead 和各部门共同管理方向、事实、决策权、Pilot、能力、人工责任和评测证据。

当前阶段：`v0.2 — Foundation / First Pilot Discovery`。

本阶段完成组织级框架，以自媒体运营作为首个 Pilot。仓库不预先规定各部门的具体功能，也不保存微信聊天全文、生产数据或敏感凭证。

## Leader 从这里开始

1. 查看 [`brain/LEADER_DASHBOARD.md`](brain/LEADER_DASHBOARD.md)，了解阶段、组合、风险和下一 Gate。
2. 查看 [`brain/OPEN_DECISIONS.md`](brain/OPEN_DECISIONS.md)，处理影响方向、权限和知识边界的事项。
3. 查看 [`brain/catalog.json`](brain/catalog.json)，只读取任务所需且 Active、未过期的 Context。
4. 按 [`governance/OPERATING_MODEL.md`](governance/OPERATING_MODEL.md) 推进 Initiative。
5. 部门接入时遵循 [`governance/ADOPTION_LIFECYCLE.md`](governance/ADOPTION_LIFECYCLE.md)。

## 仓库结构

| 目录 | 回答的问题 | 主要维护者 |
| --- | --- | --- |
| `brain/` | 现在处于什么阶段，哪些事实有效，哪些决定待处理？ | AI Transformation Lead |
| `context/` | 组织和领域已经确认什么，来源和时效是什么？ | Domain Owner |
| `governance/` | 责任、权限、知识、接入、衡量和安全规则是什么？ | Founder + AI Transformation Lead |
| `docs/decisions/` | 为什么选择当前架构、边界或政策？ | 对应决策人 |
| `skills/` | 某一类任务怎样稳定完成？ | Skill Owner |
| `workflows/` | 业务流程何时触发、怎样编排和交接？ | PM + Domain Owner |
| `tools/` | Agent 可以调用什么能力，权限和副作用是什么？ | Developer / AI Ops |
| `evals/` | 怎样证明能力在正常、缺失和风险输入下达标？ | Approver + Skill Owner |
| `schemas/` | 机器可读合同是什么？ | Developer / AI Ops |

## 组织运行方式

```text
方向与约束
  → 真实业务证据
  → 受治理 Context
  → Initiative / Pilot
  → Capability Package
  → 受控运行
  → 指标与反馈
  → 升级、修改、暂停或归档
```

Capability Package 由 Context、Skill、Workflow、Tool、Human Gate 和 Eval 按需组成。能用确定性脚本稳定完成的工作不强行使用 Agent。

## 当前事实边界

现有 AceMode 信息来自用户提供的微信 CLI 总结，覆盖“友友群”“AceMode开发团队-团队Agent”和个人文件传输助手，时间截至 2026-09-08 / 09-09。组织定位、转型方向和首个 Pilot 有较强记录支持；品牌细则、正式决策权、安全负责人和业务指标仍待确认。

证据边界记录在 [`context/sources/wechat-summary-2026-09-09.md`](context/sources/wechat-summary-2026-09-09.md)。

## 修改流程

1. 判断变更属于 Context、Decision、Governance、Skill、Workflow、Tool、Gate 还是 Eval。
2. 写明 Owner、来源、状态、复核日期和影响。
3. 对方向、权限或边界变化创建 ADR。
4. 对 Active Context 和能力取得相应 Owner / Approver 确认。
5. 运行：

```bash
npm test
npm run check
```

6. 通过 PR 提交变更，保留证据和审批记录。

## 当前边界

- 不把全部聊天、文档和日志复制进仓库。
- 不在 Skill 中写死模型、密钥、账号或一次性业务事实。
- 不因 Tool 可用就自动获得对外发布、付费、删除或生产权限。
- 不用自动化数量、Token 消耗或演示效果冒充组织价值。
- 不在顶层框架中预设自媒体、直播、测评等部门的具体功能。
