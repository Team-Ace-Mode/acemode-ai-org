# Workflow Standard

Workflow 描述一次端到端业务流，负责触发、状态、步骤顺序、参与角色、Human Gate、失败路径和产物流向。它可以组合多个 Skill 与 Tool，但不重复它们内部的方法。

## 何时需要 Workflow

- 定时、Webhook、Issue 或人工提交会触发任务；
- 涉及多个 Skill、系统或部门；
- 需要等待人工数小时或数天；
- 失败后要重试、补偿或转人工；
- 输出需要进入下游发布、归档或复盘。

## 标准步骤类型

- `skill`：需要 Agent 判断和生成的可复用方法；
- `tool`：确定性系统调用；
- `human_gate`：暂停等待有责任的人批准；
- `manual`：真实体验、谈判、线下执行等不应 Agent 化的工作；
- `eval`：自动或人工质量验证。

本地 Agent 可以由人手动执行 Workflow；未来 AWS Runner 读取同一个合同并持久化状态。任何云端执行都不能绕过仓库中的 Gate。
