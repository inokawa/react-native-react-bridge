import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
} from "react-native";
import WebView from "react-native-webview";
import { useWebViewMessage } from "react-native-react-bridge";
import webApp from "./WebApp";

export default function App() {
  const [data, setData] = useState("This is React Native");
  const { ref, onMessage, emit } = useWebViewMessage<string>((message) => {
    if (message.type === "hi") {
      setData(message.data);
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <WebView
          ref={ref}
          source={{ html: webApp }}
          onMessage={onMessage}
          onError={console.log}
        />
      </View>
      <View style={styles.bottom}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setData(text)}
          value={data}
        />
        <Pressable
          onPress={() => emit({ type: "hello", data: data })}
          style={styles.button}
        >
          <Text>send to Web</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    flex: 1,
    borderWidth: 4,
    borderColor: "gray",
  },
  bottom: {
    padding: 4,
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
  },
  button: {
    borderRadius: 10,
    padding: 8,
    backgroundColor: "lightgray",
  },
});
