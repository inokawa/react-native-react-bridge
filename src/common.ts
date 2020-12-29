export const EVENT_KEY = "rn-web-bridge";
export const ROOT_ID = "root";

export type Message<T> = {
  type: string;
  data: T;
};
