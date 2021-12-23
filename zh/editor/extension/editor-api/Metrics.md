# Metrics



## 函数

```typescript
export interface trackEventInfo {
    sendToCocosAnalyticsOnly?: boolean;
    [propName: string]: any;
}
export interface trackOptions {
    uid: string;
    cid: string;
    debug?: boolean;
}
export interface trackExceptionInfo {
    code: number;
    message: string;
}
```

### trackEvent

▸ **trackEvent**(`info: trackEventInfo`): `any`

追踪一个事件
请勿使用

**请求参数**

| Name   | Type             | Description    |
| :----- | :--------------- | :------------- |
| `info` | `trackEventInfo` | 跟踪的错误信息 |

**返回结果**

`any`

### trackException

▸ **trackException**(`info: trackExceptionInfo`): `any`

追踪一个异常
请勿使用

**请求参数**

| Name   | Type                 | Description    |
| :----- | :------------------- | :------------- |
| `info` | `trackExceptionInfo` | 跟踪的错误信息 |

**返回结果**

`any`
