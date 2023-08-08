# Module: web/preact

## Table of contents

### Functions

- [webViewRender](web_preact.md#webviewrender)
- [useNativeMessage](web_preact.md#usenativemessage)

### References

- [emit](web_preact.md#emit)

## Functions

### webViewRender

▸ **webViewRender**(`root`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | `ComponentChild` |

#### Returns

`string`

#### Defined in

[src/web/core.ts:5](https://github.com/inokawa/react-native-react-bridge/blob/6cedde5/src/web/core.ts#L5)

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

[src/web/core.ts:18](https://github.com/inokawa/react-native-react-bridge/blob/6cedde5/src/web/core.ts#L18)

## References

### emit

Re-exports [emit](web_react.md#emit)
