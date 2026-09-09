## 变更类型

- [ ] Context
- [ ] Skill
- [ ] Workflow
- [ ] Tool
- [ ] Eval
- [ ] Governance / Infrastructure

## 业务说明

- 要解决的重复任务或事实缺口：
- Domain Owner：
- Approver：
- 主要 Deliverable：

## Context 检查

- [ ] 新增 Context 已登记到 `brain/catalog.json`。
- [ ] Owner、来源、核验日期、复核日期、状态和敏感级别真实有效。
- [ ] 没有复制已有 Context，也没有提交隐私、Secrets 或原始客户数据。

## Skill 边界检查

- [ ] 一个 Skill 只产生一种主要 Deliverable。
- [ ] 一次性事实放在 Context；触发和跨 Skill 编排放在 Workflow；系统调用放在 Tool。
- [ ] Skill 未绑定模型、供应商、API endpoint、token 或临时资源 ID。
- [ ] 输入缺失、事实冲突、工具失败和审批拒绝均有明确停止或恢复方式。

## 风险与人工节点

- [ ] 外部发布、付费、删除、生产变更、权限修改和专业责任结论均设置了 Human Gate。
- [ ] 审批包包含预览、事实来源、风险、成本和撤销方式。

## 验证证据

- [ ] `npm test` 通过。
- [ ] `npm run check` 通过。
- [ ] Pilot/Active Skill 至少覆盖正常、信息缺失、风险/异常 3 类 Eval。
- [ ] Pilot → Active 已有至少 5 次代表性真实运行记录和共同批准。

## 已知限制 / 回滚方式

请写明未覆盖场景、可能影响和撤销步骤。
