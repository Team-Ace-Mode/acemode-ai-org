# ADR-0002: Organization-Level AI Native Operating Framework

日期：2026-09-09
状态：Accepted for v0.2

## Context

v0.1 建立了 Context、Skill、Workflow、Tool、Human Gate 和 Eval 的资产边界，但主要回答“Agent 资产怎样管理”。AI Transformation Lead 还需要一套跨部门框架来管理方向、责任、知识进入、Initiative 组合、部门接入、效果衡量和停止决策。

现有微信记录进一步确认：AceMode 的目标是从传统人本运转逐步转向以 Agent 为核心的组织运行；自媒体运营是首个 Pilot；具体业务功能仍由领域团队和 PRD 定义。

## Options Considered

1. 继续只扩展 Skill 和 Tool 规范。启动简单，但无法支持 Leader 做组合、责任和组织变革决策。
2. 围绕自媒体运营直接设计完整功能树。短期具体，但会把第一个 Pilot 错当成组织架构。
3. 保留资产治理层，增加组织方向、Leader 控制面、决策权、知识治理、部门接入生命周期和衡量体系。

## Decision

选择方案 3。GitHub 继续作为版本化控制面；新增 Leader Dashboard、Open Decisions 和组织治理文件；自媒体运营作为 Portfolio 中的第一个 Initiative 存在，具体功能进入后续 PRD、Skill、Workflow 和 Tool。

微信等聊天系统作为证据来源，不直接成为 Brain。原始聊天留在源系统，GitHub 保存有来源、脱敏、经 Owner 确认的 Context 和 Decision。

## Consequences

- Leader 可以在同一框架下接入多个部门，而不用复制治理结构。
- 部门想法必须先经过 Intake 和 Discovery，不能直接变成开发任务。
- 组织方向、决策权和知识边界的缺口会显式进入 Open Decisions。
- Pilot 必须与人工基线比较，并具有升级、暂停和回退条件。
- 品牌调性和角色观察在未确认前保持 Draft 或 provisional。

## Review Trigger

以下任一情况发生时复核本决定：完成首个 Active 能力、开始 AWS 无人值守运行、接入第二个部门，或正式改变 Founder 与 AI Transformation Lead 的决策权。
