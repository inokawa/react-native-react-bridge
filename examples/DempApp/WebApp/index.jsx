import React, {useState} from 'react';
import {
  webViewRender,
  emitToNative,
  useNativeMessage,
} from 'react-native-react-bridge/lib/web';
import './example.css';
import png from './Octocat.png';
import {Button} from './button';

const style = {
  width: '100vw',
  height: '100vh',
  margin: 'auto',
  backgroundColor: 'lightblue',
};

const Root = () => {
  const [data, setData] = useState('This is Web');
  useNativeMessage(message => {
    if (message.type === 'hello') {
      setData(message.data);
    }
  });
  return (
    <div style={style}>
      <div>
        <img src={png} width={100} height={'auto'} />
      </div>
      <textarea value={data} onChange={e => setData(e.target.value)} />
      <div>
        <Button onClick={() => emitToNative({type: 'hi', data: data})}>
          send to React Native
        </Button>
      </div>
    </div>
  );
};

export default webViewRender(<Root />);
