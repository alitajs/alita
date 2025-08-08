# Alpha 版本发布流程

## 概述
项目已配置为默认发布 alpha 版本。所有包的版本已更新为 `4.0.0-alpha.1`，并启用了预发布模式。

## 发布流程

### 1. 准备 Alpha 发布环境
```bash
npm run alpha-release
```
这个命令会：
- 刷新 changeset 配置
- 确保项目处于 alpha 预发布模式
- 显示后续步骤

### 2. 添加变更记录
```bash
npm run changeset
```
这会启动交互式界面来添加变更记录。

### 3. 生成版本
```bash
npm run version-packages
```
这会：
- 将包版本更新为下一个 alpha 版本（如 `4.0.0-alpha.2`）
- 更新 CHANGELOG.md
- 消费 changeset 文件

### 4. 发布到 npm
```bash
npm run release
```
这会：
- 构建所有包
- 发布到 npm，使用 `alpha` 标签
- 推送 git 标签

## 版本规则

- **Alpha 版本格式**: `4.0.0-alpha.N`
- **发布标签**: `alpha`（而不是 `latest`）
- **安装方式**: `npm install alita@alpha`

## 配置更改

### 1. 发布脚本修改
- `scripts/release.ts`: 默认使用 `alpha` 标签
- `scripts/alpha-release.ts`: 新增 alpha 发布准备脚本

### 2. 版本更新
所有包版本已更新为 `4.0.0-alpha.1`:
- `alita`
- `@alita/plugins`
- `@alita/native`
- `@alita/types`
- `create-alita`
- 等等...

### 3. 预发布模式
- Changeset 已配置为 alpha 预发布模式
- 初始版本记录在 `.changeset/pre.json`

## 退出 Alpha 模式

当准备发布正式版本时：

```bash
npx changeset pre exit
npm run version-packages  # 生成正式版本
npm run release          # 发布正式版本
```

## 注意事项

1. Alpha 版本不会成为 npm 的默认版本
2. 用户需要明确指定 `@alpha` 标签来安装
3. 所有内部依赖也会更新为对应的 alpha 版本
4. 发布前确保所有测试通过
