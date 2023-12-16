# Module: web/react

Modules for React DOM

## Table of contents

### Functions

- [webViewRender](web_react.md#webviewrender)
- [useNativeMessage](web_react.md#usenativemessage)
- [emit](web_react.md#emit)

## Functions

### webViewRender

▸ **webViewRender**(`root`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | `ReactNode` |

#### Returns

`string`

#### Defined in

[src/web/core.ts:5](https://github.com/inokawa/react-native-react-bridge/blob/2039b21/src/web/core.ts#L5)

___

### useNativeMessage

▸ **useNativeMessage**<`T`\>(`onSubscribe`): `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `onSubscribe` | (`message`: [`Message`](index.md#message)<`T`\>) => `void` |

#### Returns

`void`

#### Defined in

[src/web/core.ts:18](https://github.com/inokawa/react-native-react-bridge/blob/2039b21/src/web/core.ts#L18)

___

### emit

▸ **emit**<`T`\>(`message`): `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`Message`](index.md#message)<`T`\> |

#### Returns

`void`

#### Defined in

[src/web/core.ts:11](https://github.com/inokawa/react-native-react-bridge/blob/2039b21/src/web/core.ts#L11)
