# AceMode Brain and Skill Design v0.1

## Objective

建立一个可由团队本地 Agent 使用、未来也可由 AWS Runner 使用的组织 Brain；明确 Skill 与 Context、Workflow、Tool、Human Gate、Eval 的边界，并让关键规则可被自动检查。

## Chosen Design

采用混合控制面：GitHub 保存版本化组织资产，飞书/Notion/AWS 等业务系统继续保存其权威数据；Context Catalog 记录快照来源和时效。本地 Agent 先在人参与下使用 Draft/Pilot Skill，云端只允许读取固定版本的 Active Skill。

Skill 使用双文件合同：`SKILL.md` 面向 Agent，保持模型中立并只写耐久方法；`skill.json` 面向治理与运行时，记录 Owner、版本、状态、Context、Tool、Gate 和 Eval。端到端触发与跨步骤等待属于 Workflow，确定性系统能力属于 Tool，责任决策属于 Human Gate。

## Alternatives Rejected for v0.1

- 自由格式 Prompt 仓库：无法稳定治理和评测。
- 立即中心化服务：流程未验证，成本和权限面过大。
- 每个部门自定义格式：无法跨部门复用，也无法让云端 Runner 统一读取。

## Initial Validation

规范针对四类高压失败场景设计：模糊“爆款”内容 Skill、把整条直播宣传链写成一个 Skill、测评 Agent 虚构体验、开发 Skill 混入生产权限与密钥。校验器覆盖 Context 文件存在性、Active Skill Eval、危险 Tool Gate、模型绑定和敏感信息。

## Superseded Pilot Note

2026-09-09 的组织记录确认自媒体运营为第一条 AI Native 主线。直播活动宣传保留为已归档的候选方向，不再是默认下一 Pilot。新的部门接入、组合和成熟度规则见 `docs/decisions/0002-organization-operating-framework.md` 与 `governance/ADOPTION_LIFECYCLE.md`。
