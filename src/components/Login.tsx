import React from 'react';
import { WebView } from 'react-native-webview';
import { Modal } from 'react-native';
import { useAuth } from '../hooks/AuthContext.tsx';
import { useConnection } from '../hooks/ConnectionContext.tsx';
import { config } from '../helpers/Config.ts';

function Login(): React.JSX.Element {
  const { serverConnection } = useConnection();
  const { isAuthing, login, userData } = useAuth();

  function handleNavigationChange(event: any) {
    const code = event.url.match(/code=([^&]+)/)?.[1];
    if(!isAuthing && code){
      login(code);
    }
  }

  return <Modal
    animationType="slide"
    transparent={true}
    visible={!isAuthing && userData === undefined && (serverConnection !== undefined && serverConnection)}
  >
    <WebView
      source={{ uri: config.DISCORD_AUTH_URL }}
      onNavigationStateChange={handleNavigationChange}
    />
  </Modal>;
}
export default Login;
