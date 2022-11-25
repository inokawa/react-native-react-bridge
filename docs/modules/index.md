# Module: index

## Table of contents

### Type Aliases

- [Message](index.md#message)

### Functions

- [useWebViewMessage](index.md#usewebviewmessage)

## Type Aliases

### Message

Ƭ **Message**<`T`\>: `Object`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `data` | `T` |

#### Defined in

[src/types.ts:1](https://github.com/inokawa/react-native-react-bridge/blob/87e45a4/src/types.ts#L1)

## Functions

### useWebViewMessage

▸ **useWebViewMessage**<`T`\>(`onSubscribe`): `Object`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `onSubscribe` | (`message`: [`Message`](index.md#message)<`T`\>) => `void` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `ref` | `RefObject`<`WebView`<{}\>\> |
| `onMessage` | (`event`: `NativeSyntheticEvent`<`WebViewMessage`\>) => `void` |
| `emit` | (`message`: [`Message`](index.md#message)<`T`\>) => `void` |

#### Defined in

[src/hooks.ts:7](https://github.com/inokawa/react-native-react-bridge/blob/87e45a4/src/hooks.ts#L7)
