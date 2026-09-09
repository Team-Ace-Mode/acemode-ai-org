# Skill Standard

Skill 是某一类任务经过验证的可复用方法，回答“Agent 应怎样做”。它不是提示词收藏、部门知识库、一次性任务说明或 API 脚本。

## 标准 Skill 包

```text
skills/<skill-id>/
├─ SKILL.md       # Agent 读取的触发条件、方法和质量标准
├─ skill.json     # Owner、版本、状态、Context/Tool/Gate/Eval 映射
├─ references/    # 只有较长且稳定的参考资料才拆出
└─ scripts/       # 仅限无副作用的轻量辅助；系统调用优先做 Tool
```

`SKILL.md` frontmatter 只允许 `name` 和 `description`。组织治理字段放 `skill.json`，避免不同 Agent 客户端忽略或误解私有字段。

## 一个 Skill 必须说明

- 何时使用、何时不使用；
- 必需输入与缺失输入处理；
- 读取哪些 Context ID；
- 一种主要 Deliverable 及明确输出合同；
- 可复用步骤与决策原则；
- 允许调用的 Tool；
- Human Gate 和停止点；
- 质量检查、禁错项与失败处理；
- 对应 Eval 和生命周期状态。

## Skill 里禁止出现

- 当前活动时间、嘉宾、链接、价格等一次性事实；
- Secrets、账号、临时资源 ID；
- 底层 API endpoint、重试参数和供应商私有调用细节；
- 写死的模型或模型供应商；
- 定时触发、多人审批和跨 Skill 编排；
- 未经人工实测却声称“我使用/体验/采访过”；
- “必要时确认”“效果要好”等无法验证的模糊要求。

## 部门与开发边界

- 部门负责：真实流程、专业判断、好坏案例、质量标准和常见失败。
- PM 负责：Workflow 输入输出、触发、角色、审批和业务指标。
- 开发负责：Tool、认证、错误、运行时、校验器和日志。
- Lead 负责：Skill 粒度、生命周期、跨部门复用和自动化权限。

任何部门都可以提交 Draft，但不能自行把 Skill 升级为 Active。先用 `_template/` 起草，再按 `governance/SKILL_LIFECYCLE.md` 完成案例、Pilot 和审批。
