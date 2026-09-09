# Security and Information Policy

## GitHub 中允许保存

- 脱敏后的组织 Context；
- Skill、Workflow、Tool 合同和 Eval；
- 稳定的外部文档 URL、S3 object reference 或系统 ID；
- 不包含凭证的配置示例；
- 经审核的决策和复盘。

## 禁止保存

- API key、token、cookie、密码、私钥、真实 `.env`；
- 未脱敏的个人资料、客户原始数据和支付信息；
- 可直接访问生产系统的临时链接；
- 未获授权的合作报价、合同或未发布战略；
- Agent 的隐藏思考过程和无筛选聊天全文。

Secrets 应进入 AWS Secrets Manager、成员本机安全存储或组织批准的密码管理器。仓库只保存环境变量名称和权限说明。

## 最小权限

- 读取工具和写入工具分离；
- 草稿写入和正式发布分离；
- 本地成员凭证和云端 Service Role 分离；
- 测试、预发和生产账号分离；
- Tool 合同必须声明副作用、认证方式和审批要求。

发现敏感信息时停止处理，不要复制到 Issue、PR、日志或 Context；通知相应 Owner 进行吊销、清理和复盘。
