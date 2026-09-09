# Brain Architecture

Brain 是 AceMode AI Native 组织的控制入口。它帮助 Agent 和 Leader 找到当前方向、有效事实、进行中的 Initiative、未决问题和治理规则。

## 六层结构

| 层 | 位置 | 内容 |
| --- | --- | --- |
| 方向层 | `context/organization/`、`context/transformation/` | 组织身份、使命、转型 Charter 和当前组合 |
| 控制层 | `brain/LEADER_DASHBOARD.md`、`brain/OPEN_DECISIONS.md` | 当前阶段、风险、下一 Gate 和待决事项 |
| 事实层 | `context/`、`brain/catalog.json` | 有 Owner、来源、状态、时效和敏感级别的事实 |
| 治理层 | `governance/`、`docs/decisions/` | 权限、知识流、接入、衡量、安全和已做决定 |
| 能力层 | `skills/`、`workflows/`、`tools/` | 可复用方法、流程编排和系统能力 |
| 质量层 | `evals/`、运行证据 | 回归案例、禁错项和真实业务结果 |

聊天全文、运行日志、临时任务和 Agent 临时状态不是长期 Brain。只有经 Owner 审核、能跨任务复用的事实、决定和失败规律才进入 Context、Decision 或 Eval。

## 三个入口

- `LEADER_DASHBOARD.md`：Leader 了解当前阶段和组合。
- `OPEN_DECISIONS.md`：处理会阻塞方向、权限或知识边界的问题。
- `catalog.json`：Agent 查找当前 Context 的唯一目录。

## Catalog 规则

每份 Context 必须记录稳定 ID、路径、Owner、权威来源、状态、核验时间、复核时间和敏感级别。

- `draft`：正在采集或等待 Owner 确认，不能作为关键事实。
- `active`：已核验，可按敏感级别使用。
- `stale`：超过复核时间，只能作为线索。
- `archived`：历史记录，不进入默认上下文。

相同主题冲突时，先比较 Decision、Owner 权限、Catalog 状态、来源和时效；无法确定时进入 Open Decisions。

## 变更边界

Context 更新不直接修改 Skill。事实变化导致方法、流程或责任变化时，分别更新相应资产并重新运行 Eval。当前任务和截止时间进入 Initiative / Workflow 状态，不写进长期方法。
