# Module: web/preact

Modules for Preact

## Table of contents

### Functions

- [webViewRender](web_preact.md#webviewrender)
- [useNativeMessage](web_preact.md#usenativemessage)

### References

- [emit](web_preact.md#emit)

## Functions

### webViewRender

▸ **webViewRender**(`root`): `string`

The entry point of web file

This statement is detected by babelTransformer as an entry point
All dependencies are resolved, compressed and stringified into one file

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | `ComponentChild` |

#### Returns

`string`

#### Defined in

[src/web/preact.ts:17](https://github.com/inokawa/react-native-react-bridge/blob/6e88c7aaeb2065facab677943b1589e38f6c4a47/src/web/preact.ts#L17)

___

### useNativeMessage

▸ **useNativeMessage**\<`T`\>(`onSubscribe`): `void`

A hook to subscribe messages from React Native.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `onSubscribe` | (`message`: [`ReactNativeMessage`](../interfaces/index.ReactNativeMessage.md)\<`T`\>) => `void` |

#### Returns

`void`

#### Defined in

[src/web/preact.ts:25](https://github.com/inokawa/react-native-react-bridge/blob/6e88c7aaeb2065facab677943b1589e38f6c4a47/src/web/preact.ts#L25)

## References

### emit

Re-exports [emit](web_react.md#emit)
