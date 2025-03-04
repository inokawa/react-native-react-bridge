[**API**](../../API.md)

***

# Function: useWebViewMessage()

> **useWebViewMessage**\<`T`\>(`onSubscribe`): `object`

Defined in: [src/native/index.ts:28](https://github.com/inokawa/react-native-react-bridge/blob/a54748fc9a4bfd9c93c7e9a7c5213de725bd9170/src/native/index.ts#L28)

A hook to subscribe messages from WebView.

## Type Parameters

• **T**

## Parameters

### onSubscribe

(`message`) => `void`

## Returns

`object`

### ref

> **ref**: `RefObject`\<`WebView`\<\{\}\>\>

### onMessage()

> **onMessage**: (`event`) => `void`

#### Parameters

##### event

`WebViewMessageEvent`

#### Returns

`void`

### emit()

> **emit**: (`message`) => `void`

#### Parameters

##### message

[`ReactNativeMessage`](../interfaces/ReactNativeMessage.md)\<`T`\>

#### Returns

`void`
