# Module: web/react

Modules for React DOM

## Table of contents

### Functions

- [webViewRender](web_react.md#webviewrender)
- [webViewCreateRoot](web_react.md#webviewcreateroot)
- [useNativeMessage](web_react.md#usenativemessage)
- [emit](web_react.md#emit)

## Functions

### webViewRender

▸ **webViewRender**(`root`): `string`

The entry point of web file

This statement is detected by babelTransformer as an entry point
All dependencies are resolved, compressed and stringified into one file

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | `ReactElement`\<`any`, `string` \| `JSXElementConstructor`\<`any`\>\> |

#### Returns

`string`

#### Defined in

[src/web/react.ts:18](https://github.com/inokawa/react-native-react-bridge/blob/6e88c7aaeb2065facab677943b1589e38f6c4a47/src/web/react.ts#L18)

___

### webViewCreateRoot

▸ **webViewCreateRoot**(`root`): `string`

[webViewRender](web_react.md#webviewrender) but initiated with React's createRoot

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | `ReactElement`\<`any`, `string` \| `JSXElementConstructor`\<`any`\>\> |

#### Returns

`string`

#### Defined in

[src/web/react.ts:26](https://github.com/inokawa/react-native-react-bridge/blob/6e88c7aaeb2065facab677943b1589e38f6c4a47/src/web/react.ts#L26)

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

[src/web/react.ts:34](https://github.com/inokawa/react-native-react-bridge/blob/6e88c7aaeb2065facab677943b1589e38f6c4a47/src/web/react.ts#L34)

___

### emit

▸ **emit**\<`T`\>(`message`): `void`

A function to send a message to React Native

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`WebViewMessage`](../interfaces/index.WebViewMessage.md)\<`T`\> |

#### Returns

`void`

#### Defined in

[src/web/core.ts:13](https://github.com/inokawa/react-native-react-bridge/blob/6e88c7aaeb2065facab677943b1589e38f6c4a47/src/web/core.ts#L13)
