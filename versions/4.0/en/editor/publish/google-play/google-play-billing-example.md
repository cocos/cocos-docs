# Using the Google Play Billing

## Import the API
```ts
import { google } from 'cc'
```

## Initialize BillingClient
```ts
import { google } from 'cc'
this._client = google.billing.BillingClient.newBuilder().enablePendingPurchases(
                    google.billing.PendingPurchasesParams.newBuilder().enableOneTimeProducts().build()
                ).setListener({
                    onPurchasesUpdated: (billingResult: google.billing.BillingResult, purchases: google.billing.Purchase[]): void => {
                        // TODO: Handle purchase updates
                    }
                }).build();
```

## Connect to Google Play
```ts
this._client.startConnection({
    onBillingServiceDisconnected: (): void => {
        // TODO: Handle connection failure
    },
    onBillingSetupFinished: (billingResult: google.billing.BillingResult): void => {
        // TODO: Handle successful connection
    }
});
```

## Show Available Products
```ts
const product = google.billing.QueryProductDetailsParams.Product.newBuilder()
                    .setProductId("productId")
                    .setProductType(google.billing.BillingClient.ProductType.INAPP)
                    .build();
const params = google.billing.QueryProductDetailsParams.newBuilder().setProductList([product]).build();
this._client.queryProductDetailsAsync(params, {
    onProductDetailsResponse: (billingResult: google.billing.BillingResult, productDetailsList: google.billing.ProductDetails[]): void => {
        // TODO: Product query callback
    }
});
```

## Launch Purchase Flow
```ts
const params = google.billing.BillingFlowParams.newBuilder().setProductDetailsParamsList(
        [google.billing.BillingFlowParams.ProductDetailsParams.newBuilder().setProductDetails(productDetails).build()]
    ).build();
this._client.launchBillingFlow(params);
```

## Consumable Products
```ts
this._client.consumeAsync(google.billing.ConsumeParams.newBuilder().setPurchaseToken(this._purchases[0].getPurchaseToken()).build(), {
    onConsumeResponse: (billingResult: google.billing.BillingResult, token: string): void => {
        // TODO: Consumption callback
    }
});
```

## Non-Consumable Products
```ts
this._client.acknowledgePurchase(
    google.billing.AcknowledgePurchaseParams.newBuilder().setPurchaseToken(this._purchases[0].getPurchaseToken()).build(), {
        onAcknowledgePurchaseResponse: (billingResult: google.billing.BillingResult): void => {
            // TODO
        }
    });
```

## Query Purchased Products
```ts
this._client.queryPurchasesAsync(
    google.billing.QueryPurchasesParams.newBuilder().setProductType(google.billing.BillingClient.ProductType.INAPP).build(), {
    onQueryPurchasesResponse: (billingResult: google.billing.BillingResult, purchaseList: google.billing.Purchase[]) : void => {
        // TODO: Purchased products callback
    }
});
```

## Query User Billing Configuration
```ts
this._client.getBillingConfigAsync(google.billing.GetBillingConfigParams.newBuilder().build(), {
    onBillingConfigResponse: (billingResult: google.billing.BillingResult, billingConfig: google.billing.BillingConfig) : void => {
        // TODO: Get user config callback
    }
});
```