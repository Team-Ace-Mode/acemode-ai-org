# Roles and Decision Rights

## 角色定义

| 角色 | 对什么负责 | 可以决定什么 | 不能单独决定什么 |
| --- | --- | --- | --- |
| Founder | 组织使命、重大商业与品牌方向、最终责任 | 组织方向、重大优先级、重大风险例外 | 不能用模糊口头许可替代生产权限和审计要求 |
| AI Transformation Lead | 总框架、组合、成熟度、跨部门一致性 | 资产标准、Pilot Gate、组合顺序、要求补证据或暂停 | 不能代替 Domain Approver 确认专业事实和外部结果 |
| Domain Owner | 领域事实、当前流程、业务结果和资源 | 领域事实、Pilot 问题、输入输出、是否接受业务变化 | 不能绕过组织安全和外部发布 Gate |
| PM | 需求边界、Workflow、验收和观测 | PRD、流程状态、交付合同、验收案例 | 不能授予生产权限或确认未知业务事实 |
| Skill Owner | 方法、版本、失败规律和 Eval 映射 | Skill Patch、提出升级、风险降级 | 不能自行将 Draft/Pilot 升为 Active |
| Developer / AI Ops | Tool、运行环境、权限、日志和恢复 | 技术实现、测试策略、运行约束 | 不能因为工具可调用就执行未获授权动作 |
| Domain Approver | 专业质量、品牌或发布结果 | 接受或拒绝具体结果；确认领域 Gate | 不能永久授权所有未来同类动作 |

## 决策等级

| 决策 | Accountable | 必须参与 | 记录形式 |
| --- | --- | --- | --- |
| 改变组织 AI Native 方向 | Founder | AI Transformation Lead | ADR / Decision |
| 新增或停止一个部门 Pilot | AI Transformation Lead | Founder、Domain Owner | Portfolio + Decision |
| 确认领域事实 | Domain Owner | 事实提供者 | Context PR |
| 确认品牌口径 | Brand / Content Approver | Founder 或授权人 | Context PR |
| Draft → Pilot | AI Transformation Lead | Domain Owner、PM、Developer | Lifecycle review |
| Pilot → Active | AI Transformation Lead | Domain Owner、Domain Approver、Developer | Evidence-backed Decision |
| 对外发布具体内容 | Domain Approver | 内容 Owner | Human Gate record |
| 生产部署、数据迁移、权限变更 | 授权的生产负责人 | Developer / AI Ops、相关 Owner | Change approval |
| 安全边界例外 | Founder 或正式安全负责人 | AI Transformation Lead、系统 Owner | Time-bounded exception |

## 当前临时映射

- Founder：bigjoe / 硅谷大舅。
- AI Transformation Lead：Zihan / 子涵。
- 自媒体 Pilot PM：Kikiii / Kiki。
- 技术支持：飘海、。等开发成员。
- 自媒体需求接口：至 / 芒果。

这是依据现有记录建立的临时映射。Founder 需要确认 Leader 的授权范围、各部门 Domain Owner、Approver 和生产负责人后，才能把对应决策从临时状态改为正式状态。

## 正式决定的最低标准

一项决定只有同时满足以下条件，才进入 Brain：

1. 决定内容和适用范围明确；
2. 决策人具有对应权限；
3. 记录日期、原因和替代方案；
4. 标明何时复核或失效；
5. 涉及代码或合同的变化通过 PR 留痕。

微信群里的意见、认可或“就这么干”可以触发 Decision 提案。除非明确记录了范围和决策人，否则不能自动解释为永久政策。
