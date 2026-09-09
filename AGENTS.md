# AceMode Agent Operating Contract

本文件是本仓库内所有本地 Agent 和未来云端 Runner 的共同运行规则。

## 目标

优先让 Agent 承担重复、可验证的执行，把人的时间保留给目标、真实体验、专业判断、监督、风险决策和最终验收。不得为了追求自动化率牺牲真实性、安全性和可追责性。

## 开始任务

1. 先读 `brain/LEADER_DASHBOARD.md`，确认当前阶段和 Initiative。
2. 再读 `brain/catalog.json`，只加载完成任务需要的 Context。
3. 检查 `brain/OPEN_DECISIONS.md`，确认任务是否依赖尚未裁决的问题。
4. 区分 Context、Decision、Governance、Skill、Workflow、Tool、Human Gate 和 Eval。

## 信息优先级

发生冲突时，按以下顺序处理：

1. 当前任务中具有相应权限的人类明确指令；
2. `governance/` 中的安全、权限和人工审批规则；
3. 已接受且仍有效的 Decision；
4. 当前 Initiative / Workflow 的范围和状态；
5. 当前 Skill 的执行方法与质量标准；
6. `brain/catalog.json` 中 Active 且未过期的 Context；
7. Draft、Stale、Evidence Summary 和示例只能作为线索。

发现冲突、缺失或过期事实时必须指出。不能自行把观察、群聊意见或推测升级为组织事实。

## 执行规则

- 只加载完成当前任务所需的最小 Context，并保留来源。
- `draft` Skill 仅供讨论；`pilot` Skill 只能在人持续参与时使用；只有 `active` Skill 可进入批准的稳定 Workflow。
- Tool 只提供能力，Tool 可用不代表动作已获授权。
- 能由确定性脚本可靠完成的工作优先使用 Tool，不为“Agent 化”增加不必要的不确定性。
- 对外发布、付费、删除、生产部署、数据迁移、权限/密钥变更和商业承诺必须遵守 Human Gate。
- 产品测评不得虚构真实体验、采访、购买或测试；缺少人工实测记录时只能整理资料、提出问题或生成大纲。
- 运行环境根据能力、质量、成本和延迟策略选择模型，长期 Skill 不绑定供应商。
- 不提交 secrets、tokens、cookies、个人隐私、客户原始数据、聊天全文或未批准公开的受限资料。

## 微信和其他信息源

- 新采集内容先形成 Evidence Summary。
- 明确区分事实、个人观点、正式决定、临时任务、分歧和已失效决定。
- 影响方向、权限、品牌、外部承诺和安全的内容必须由相应 Owner 确认。
- 原始聊天留在源系统；GitHub 保存脱敏结论、来源定位和有效期。

## 人工审批包

暂停审批时至少提供：拟执行动作、目标对象、完整预览或 Diff、关键事实及来源、质量检查、风险与成本、可撤销方式、审批有效范围和所需角色。沉默不视为批准。

## 完成标准

只有在业务输出合同满足、质量检查完成、Human Gate 已通过、相关 Eval 有证据、运行结果被业务 Owner 接受时，才能声明完成。工具返回成功不等于业务结果合格。

## 改进规则

- 一次失败先进入 Eval、Known Error 或运行复盘，再决定是否修改 Skill。
- 可机械检查的规则写进校验器。
- Skill 变更必须更新版本和评测，不得静默改变 Active 行为。
- 运行记录不是长期知识；只有经 Owner 审核且能跨任务复用的结论才能进入 Context。
- 每项 Pilot 必须明确升级、暂停和回退条件。
