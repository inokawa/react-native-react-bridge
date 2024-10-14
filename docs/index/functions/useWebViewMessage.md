[**API**](../../API.md) • **Docs**

***

# Function: useWebViewMessage()

> **useWebViewMessage**\<`T`\>(`onSubscribe`): `object`

A hook to subscribe messages from WebView.

## Type Parameters

• **T**

## Parameters

• **onSubscribe**

## Returns

`object`

### ref

> **ref**: `RefObject`\<`WebView`\<`object`\>\>

### onMessage()

> **onMessage**: (`event`) => `void`

#### Parameters

• **event**: `WebViewMessageEvent`

#### Returns

`void`

### emit()

> **emit**: (`message`) => `void`

#### Parameters

• **message**: [`ReactNativeMessage`](../interfaces/ReactNativeMessage.md)\<`T`\>

#### Returns

`void`

## Defined in

[src/native/index.ts:28](https://github.com/inokawa/react-native-react-bridge/blob/d26d92078fb33b1c0c8fd4a3ec39d47e56a03c08/src/native/index.ts#L28)
