export interface WebViewMessage<T> {
  type: string;
  data: T;
}

export interface ReactNativeMessage<T> {
  type: string;
  data: T;
}
