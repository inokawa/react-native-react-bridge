import React from 'react';
import {useState} from 'react';
import {
  webViewRender,
  emit,
  useSubscribe,
} from 'react-native-react-bridge/lib/web';

const style = {
  width: '100vw',
  height: '100vh',
  margin: 'auto',
  backgroundColor: 'lightblue',
};

const Root = () => {
  const [data, setData] = useState('This is Web');
  useSubscribe((message) => {
    if (message.type === 'hello') {
      setData(message.data);
    }
  });
  return (
    <div style={style}>
      <textarea value={data} onChange={(e) => setData(e.target.value)} />
      <div>
        <button onClick={() => emit({type: 'hi', data: data})}>
          send to React Native
        </button>
      </div>
    </div>
  );
};

export default webViewRender(<Root />);
