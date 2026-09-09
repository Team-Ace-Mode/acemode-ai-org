# AI Native Operating Model

本文件定义 AceMode 如何持续推进组织 AI Native 化。它服务于 Founder、AI Transformation Lead、Domain Owner、PM、Developer / AI Ops 和 Approver，不描述某个部门的具体功能。

## 一、组织运行闭环

```text
Direction
  ↓
Evidence → Governed Context
  ↓
Initiative Portfolio
  ↓
Capability Package
  ↓
Controlled Execution
  ↓
Outcome Evidence
  ↓
Promote / Change / Pause / Retire
```

### Direction

Founder 和 AI Transformation Lead 明确阶段目标、资源边界和不可越过的责任。方向发生变化时创建 Decision，不通过聊天中的隐含理解静默改变。

### Evidence

业务事实来自微信、腾讯文档、飞书、AWS、GitHub 或领域人员。原始来源留在原系统，GitHub 保存脱敏、可追溯、经过 Owner 确认的 Context 快照。

### Initiative Portfolio

所有跨团队 AI Native 工作进入统一组合，至少记录：问题、业务结果、Domain Owner、阶段、风险、下一 Gate 和证据。Leader 控制并行数量，避免每个想法直接变成开发任务。

### Capability Package

一个可正式运行的能力由 Context、Skill、Workflow、Tool、Human Gate 和 Eval 组成。不是每项能力都需要复杂 Agent；可以由普通脚本稳定完成的部分应放进 Tool。

### Controlled Execution

Draft 用于讨论；Pilot 与人工流程并行；Active 才能进入批准的稳定运行。外部发布、付费、生产变更、删除和权限操作遵守 Human Gate。

### Outcome Evidence

每次 Pilot 收集基线、耗时、质量、返工、失败、人类介入和运行成本。工具调用成功不等于业务成功。

### Lifecycle Decision

Leader 和 Domain Owner 依据证据决定扩大、修改、暂停或归档。失败规律进入 Eval 或复盘，只有可复用结论进入长期 Context。

## 二、三层管理对象

| 层级 | 管理对象 | 主要责任人 | 典型周期 |
| --- | --- | --- | --- |
| 组织层 | 愿景、原则、权限、组合、跨部门标准 | Founder + AI Transformation Lead | 月度 / 季度 |
| 领域层 | 事实、业务结果、责任、案例、验收 | Domain Owner + Approver | 双周 / 月度 |
| 能力层 | Skill、Workflow、Tool、Gate、Eval、运行证据 | PM + Skill Owner + Developer | 每次迭代 |

## 三、Leader 的核心产物

- AI Native Charter；
- Initiative Portfolio；
- 角色与决策权；
- Open Decisions；
- 部门接入与成熟度评审；
- 组织 Scorecard；
- 跨部门标准和异常升级记录。

Leader 不替领域团队定义专业事实，也不因技术可行就批准生产使用。

## 四、最小治理原则

- 所有正式资产有 Owner、状态、来源和复核日期。
- 所有正式能力有业务结果、Approver、Eval 和停止条件。
- 临时任务、聊天全文和运行日志不进入长期 Brain。
- 每个指标都与人的时间、业务质量或风险有关。
- 先降低关键人依赖，再扩大自动化范围。
