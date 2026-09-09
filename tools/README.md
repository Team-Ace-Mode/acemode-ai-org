# Tool Contract Standard

Tool 是 Agent 可以调用的确定性能力，例如读取飞书活动、查询 AWS 数据、创建公众号草稿或提交 GitHub PR。Tool 不负责决定内容策略，也不能替代 Human Gate。

每个 Tool 使用 `tools/<tool-id>/tool.json` 声明：

- 稳定 ID 和名称；
- 输入/输出 schema（实现阶段补充）；
- `sideEffect`：`read_only`、`internal_write`、`external_write` 或 `destructive`；
- `auth`：用户级、服务角色或无需认证；
- `approval`：是否必须批准；
- 超时、幂等、错误分类和审计要求（实现阶段补充）。

规则：

- `external_write` 和 `destructive` 必须设为 `approval: required`。
- Skill 只能引用 Tool ID，不保存凭证、endpoint 和临时参数。
- 云端 Runner 与本地 Agent 可以有不同适配器，但必须遵守同一 Tool 合同。
- Tool 返回成功只证明调用完成，不证明业务结果合格。
