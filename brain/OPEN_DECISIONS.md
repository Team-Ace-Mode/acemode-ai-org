# Open Organization Decisions

本文件只记录会改变组织方向、权限、知识边界或 Pilot Gate 的问题。具体实现选择留在对应 PRD 或 ADR。

| ID | 决策问题 | Accountable | 需要的证据 | 建议期限 | 临时规则 |
| --- | --- | --- | --- | --- | --- |
| OD-001 | Founder 与 AI Transformation Lead 的正式决策边界是什么？ | Founder | 方向、组合、验收、暂停和例外清单 | 2026-09-30 | 重大方向和例外由 Founder；成熟度和组合由 Lead 提案并留痕 |
| OD-002 | 各部门 Domain Owner、Approver 和 Skill Maintainer 是谁？ | Founder + Department Leads | 当前职责和可投入时间 | 2026-09-30 | 没有 Owner / Approver 的能力不能进入 Pilot |
| OD-003 | 什么形式构成正式组织决定？ | AI Transformation Lead | 微信协作习惯与 GitHub PR 流程 | 2026-09-30 | 群聊触发提案，长期政策必须进入 Decision / PR |
| OD-004 | GitHub 仓库的可见性和可保存信息边界是什么？ | Founder + AI Transformation Lead | 合作、隐私和团队访问需求 | 2026-09-20 | 按私有、最小化和脱敏处理 |
| OD-005 | 第一阶段 AI Native 的主要成功指标是什么？ | Founder + AI Transformation Lead | 自媒体人工基线、质量与成本数据 | Pilot 开始前 | 同时记录时间、质量、返工、成本和关键人依赖 |
| OD-006 | 对外发布、付费、删除、生产和权限变更分别由谁批准？ | Founder | 当前账号与生产责任人 | 首个有写入能力的 Tool 前 | 全部使用 H2/H3 Gate，不允许无人批准执行 |
| OD-007 | 微信、腾讯文档、飞书、GitHub 和 AWS 各自保存什么？ | AI Transformation Lead + System Owners | 数据类型、权限、检索和迁移需求 | 2026-10-15 | 原始数据留原系统，GitHub 只存受治理快照与引用 |

## 关闭规则

关闭一项决策时创建或更新 `docs/decisions/` 下的 ADR，并在本表填写结果链接。决定如果有复核日期，届时重新打开；不得删除历史记录来制造“从未有过分歧”的假象。
