# Skill Lifecycle

## 生命周期

```text
Idea/Issue → Draft → Pilot → Active → Deprecated
```

- `Idea/Issue`：只有需求或想法，不创建可发现的 Skill 包。
- `draft`：已形成初稿，但没有足够真实案例；不能用于无人值守执行。
- `pilot`：在真实低风险任务中试运行，全程保留人审和运行记录。
- `active`：通过规定 Eval 和 Pilot 复盘，可供批准的本地或云端 Workflow 使用。
- `deprecated`：禁止新流程引用，保留迁移说明和历史 Eval。

## 创建与升级条件

### Idea → Draft

- 有明确的一类重复任务和主要 Deliverable；
- 明确 Domain Owner 与 Approver；
- 至少知道所需输入、Context、风险和人工节点；
- 没有把一次性项目事实写入方法。

### Draft → Pilot

- 至少有 3 个真实历史案例：正常、信息缺失、风险/异常；
- Skill、Tool 和 Workflow 边界通过评审；
- 外部写入、付费或高风险动作已有 Human Gate；
- 输出合同和失败停止条件清楚；
- `npm run check` 通过。

### Pilot → Active

- 完成至少 5 次代表性真实运行；
- 关键禁错项无失败；
- 所有 Eval 通过；
- 人工返工原因已记录并处理；
- Domain Approver 与 AI 转型 Lead 共同批准；
- 云端使用还需开发确认权限、日志、超时和回滚。

## 变更规则

- 修正文案或解释但不改变行为：Patch 版本。
- 改变输入、输出、步骤或 Gate：Minor 版本并重新 Pilot。
- 删除能力、改变责任或产生不兼容输出：Major 版本并提供迁移说明。
- 发现严重风险时可立即降级为 Draft/Deprecated，不等待常规发布周期。

## 角色

| 角色 | 责任 |
| --- | --- |
| Domain Owner | 提供真实流程、事实、案例和业务结果 |
| Skill Owner | 维护方法、版本、失败规律和评测映射 |
| Domain Approver | 对专业质量、品牌或发布结论负责 |
| PM | 定义 Workflow、输入输出、业务验收和观测指标 |
| Developer / AI Ops | 实现 Tool、校验、运行环境、权限和日志 |
| AI Transformation Lead | 管理跨部门边界、升级门槛和冲突裁决 |
