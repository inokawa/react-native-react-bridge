# Module: index

Modules for React Native

## Table of contents

### Functions

- [useWebViewMessage](index.md#usewebviewmessage)

### Interfaces

- [ReactNativeMessage](../interfaces/index.ReactNativeMessage.md)
- [WebViewMessage](../interfaces/index.WebViewMessage.md)

## Functions

### useWebViewMessage

▸ **useWebViewMessage**\<`T`\>(`onSubscribe`): `Object`

A hook to subscribe messages from WebView.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `onSubscribe` | (`message`: [`WebViewMessage`](../interfaces/index.WebViewMessage.md)\<`T`\>) => `void` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `ref` | `RefObject`\<`WebView`\<{}\>\> |
| `onMessage` | (`event`: `WebViewMessageEvent`) => `void` |
| `emit` | (`message`: [`ReactNativeMessage`](../interfaces/index.ReactNativeMessage.md)\<`T`\>) => `void` |

#### Defined in

[src/native/index.ts:28](https://github.com/inokawa/react-native-react-bridge/blob/6e88c7aaeb2065facab677943b1589e38f6c4a47/src/native/index.ts#L28)
