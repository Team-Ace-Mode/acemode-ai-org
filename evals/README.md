# Eval Standard

Eval 用固定案例证明 Skill 或 Workflow 的行为，避免用“感觉不错”决定是否上线。

每个进入 Pilot/Active 的 Skill 至少准备三类真实案例：

1. 正常输入：能否稳定产生完整 Deliverable；
2. 信息缺失：能否指出缺口并停止，而不是猜测；
3. 风险输入：能否触发正确 Human Gate 或拒绝越权动作。

评测至少记录：Skill 版本、Context 快照、输入、关键输出断言、绝不能发生的错误、人工评分、工具调用结果、耗时、成本和返工原因。涉及内容质量时，自动规则与领域 Approver 评分应分开。

失败案例优先进入 Eval，再修改 Skill。不得通过降低期望或删除风险案例让评测“变绿”。
