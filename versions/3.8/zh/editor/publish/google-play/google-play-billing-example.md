# 使用 Google Play Billing接口

## 导入接口
``` ts
import { google } from 'cc'
```

## 初始化 BillingClient
``` ts
import { google } from 'cc'
this._client = google.billing.BillingClient.newBuilder().enablePendingPurchases(
                    google.billing.PendingPurchasesParams.newBuilder().enableOneTimeProducts().build()
                ).setListener({
                    onPurchasesUpdated: (billingResult: google.billing.BillingResult, purchases: google.billing.Purchase[]): void => {
                        // TODO: 购买更新回调
                    }
                }).build();
```

## 连接到 Google Play

``` ts
this._client.startConnection({
    onBillingServiceDisconnected: (): void => {
        // TODO: 连接失败处理
    },
    onBillingSetupFinished: (billingResult: google.billing.BillingResult): void => {
        // TODO: 连接成功处理
    }
});
```

## 展示可供购买的商品
``` ts
const product = google.billing.QueryProductDetailsParams.Product.newBuilder()
                    .setProductId("productId")
                    .setProductType(google.billing.BillingClient.ProductType.INAPP)
                    .build();
const params =  google.billing.QueryProductDetailsParams.newBuilder().setProductList([product]).build();
this._client.queryProductDetailsAsync(params, {
    onProductDetailsResponse: (billingResult: google.billing.BillingResult, productDetailsList: google.billing.ProductDetails[]): void => {
        // TODO: 产品查询回调
    }
});
```

## 启动购买流程
``` ts
const params = google.billing.BillingFlowParams.newBuilder().setProductDetailsParamsList(
        [google.billing.BillingFlowParams.ProductDetailsParams.newBuilder().setProductDetails(productDetails).build()]
    ).build();
this._client.launchBillingFlow(params);
```


## 消耗型商品
```ts
this._client.consumeAsync(google.billing.ConsumeParams.newBuilder().setPurchaseToken(this._purchases[0].getPurchaseToken()).build(), {
    onConsumeResponse: (billingResult: google.billing.BillingResult, token: string): void => {
        // TODO: 消耗回调
    }
});
```

## 非消耗型商品
```ts
this._client.acknowledgePurchase(
    google.billing.AcknowledgePurchaseParams.newBuilder().setPurchaseToken(this._purchases[0].getPurchaseToken()).build(), {
        onAcknowledgePurchaseResponse: (billingResult: google.billing.BillingResult): void => {
            // TODO
        }
    });
```

## 查询已购买商品
``` ts
this._client.queryPurchasesAsync(
    google.billing.QueryPurchasesParams.newBuilder().setProductType(google.billing.BillingClient.ProductType.INAPP).build(), {
    onQueryPurchasesResponse: (billingResult: google.billing.BillingResult, purchaseList: google.billing.Purchase[]) : void => {
        // TODO: 已购买商品回调
    }
});
```


## 查询用户的结算配置
``` ts
this._client.getBillingConfigAsync(google.billing.GetBillingConfigParams.newBuilder().build(), {
    onBillingConfigResponse: (billingResult: google.billing.BillingResult, billingConfig: google.billing.BillingConfig) : void => {
        // TODO: 获取用户配置回调
    }
});
```