---
Types of changes
:Added: for new features. 新添加的功能。
:Changed: for changes in existing functionality. 对现有功能的变更。
:Deprecated: for soon-to-be removed features. 已经不建议使用，准备很快移除的功能。
:Removed: for now removed features. 已经移除的功能。
:Fixed: for any bug fixes. 对bug的修复
:Security: in case of vulnerabilities. 对安全的改进
---

### 0.4.0

- `Added` 配置tongjiCode，添加百度统计

> 在JS中调用事件跟踪代码。
> `_hmt.push(['_trackEvent', category, action, opt_label, opt_value]);`

| 参数 | 说明 |
|  :-  | :-:  |
| category | 要监控的目标的类型名称，通常是同一组目标的名字，比如"视频"、"音乐"、"软件"、"游戏"等等。该项必填，不填、填"-"的事件会被抛弃。 |
| action | 用户跟目标交互的行为，如"播放"、"暂停"、"下载"等等。该项必填，不填、填"-"的事件会被抛弃。 |
| opt_label | 事件的一些额外信息，通常可以是歌曲的名称、软件的名称、链接的名称等等。该项选填，不填、填"-"代表此项为空。 |
| opt_value | 事件的一些数值信息，比如权重、时长、价格等等，在报表中可以看到其平均值等数据。该项可选。 |

- `Added` 配置gaCode，添加谷歌统计
