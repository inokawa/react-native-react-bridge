// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { useNativeMessage, emitToNative } from "./react";
import { useWebViewMessage, buildEmitToWebView } from "../native";
import { useEffect, useState } from "react";
import { ReactNativeMessage, WebViewMessage } from "../types";

const ReactNativeWebViewEvent = "RNW";

(globalThis.window as any).ReactNativeWebView = {
  postMessage: (message: string) => {
    window.dispatchEvent(
      new CustomEvent(ReactNativeWebViewEvent, { detail: message })
    );
  },
};

afterEach(cleanup);

describe("send message to web", () => {
  const NativeApp = ({ message }: { message: ReactNativeMessage<string> }) => {
    return (
      <button
        onClick={() => {
          eval(buildEmitToWebView(message));
        }}
      >
        send
      </button>
    );
  };
  const WebApp = ({ target }: { target: string }) => {
    const [data, setData] = useState<null | string>(null);
    const [count, setCount] = useState(0);
    useNativeMessage<string>((m) => {
      if (m.type === target) {
        setData(m.data);
      }
      setCount((p) => p + 1);
    });
    return (
      <div data-testid="web">
        {data}:{count}
      </div>
    );
  };

  it("correct message", () => {
    const message = { type: "foo", data: "Success!" };

    render(
      <div>
        <NativeApp message={message} />
        <WebApp target={message.type} />
      </div>
    );
    const sendButton = screen.getByRole("button");
    const webLabel = screen.getByTestId("web");
    expect(webLabel.textContent).toEqual(":0");

    sendButton.click();

    waitFor(() => expect(webLabel.textContent).toEqual(message.data) + ":1");
  });

  it("wrong message", () => {
    const message = { type: "foo", data: "Success!" };

    render(
      <div>
        <NativeApp message={message} />
        <WebApp target={"bar"} />
      </div>
    );
    const sendButton = screen.getByRole("button");
    const webLabel = screen.getByTestId("web");
    expect(webLabel.textContent).toEqual(":0");

    sendButton.click();

    waitFor(() => expect(webLabel.textContent).toEqual(":1"));
  });
});

describe("send message to native", () => {
  const WebApp = ({ message }: { message: WebViewMessage<string> }) => {
    return (
      <button
        onClick={() => {
          emitToNative(message);
        }}
      >
        send
      </button>
    );
  };
  const NativeApp = ({ target }: { target: string }) => {
    const [data, setData] = useState<null | string>(null);
    const [count, setCount] = useState(0);
    const onMessage = useWebViewMessage<string>((m) => {
      if (m.type === target) {
        setData(m.data);
      }
      setCount((p) => p + 1);
    });
    useEffect(() => {
      const listener = (e: any) => {
        onMessage(JSON.parse(e.detail));
      };
      window.addEventListener(ReactNativeWebViewEvent, listener);
      return () => {
        window.removeEventListener(ReactNativeWebViewEvent, listener);
      };
    }, []);
    return (
      <div data-testid="native">
        {data}:{count}
      </div>
    );
  };

  it("correct message", () => {
    const message = { type: "foo", data: "Success!" };

    render(
      <div>
        <WebApp message={message} />
        <NativeApp target={message.type} />
      </div>
    );
    const sendButton = screen.getByRole("button");
    const webLabel = screen.getByTestId("native");
    expect(webLabel.textContent).toEqual(":0");

    sendButton.click();

    waitFor(() => expect(webLabel.textContent).toEqual(message.data + ":1"));
  });

  it("wrong message", () => {
    const message = { type: "foo", data: "Success!" };

    render(
      <div>
        <WebApp message={message} />
        <NativeApp target={"bar"} />
      </div>
    );
    const sendButton = screen.getByRole("button");
    const webLabel = screen.getByTestId("native");
    expect(webLabel.textContent).toEqual(":0");

    sendButton.click();

    waitFor(() => expect(webLabel.textContent).toEqual(":1"));
  });
});
