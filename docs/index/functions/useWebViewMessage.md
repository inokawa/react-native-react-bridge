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

[src/native/index.ts:28](https://github.com/inokawa/react-native-react-bridge/blob/5ee94fe89bf5e5651d81f91c134d0e6639b5c7a5/src/native/index.ts#L28)
