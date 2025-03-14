import React, {useState} from 'react';
import { DISCORD_AUTH_URL } from '@env';
import { WebView } from 'react-native-webview';
import { Modal } from 'react-native';
import { useAuth } from '../hooks/AuthContext.tsx';

function Login(): React.JSX.Element {
  const { isAuthenticated, login } = useAuth();
  const [isAuthing, setIsAuthing] = useState(false);
  function handleNavigationChange(event: any) {
    const code = event.url.match(/code=([^&]+)/)?.[1];
    if(!isAuthing && code){
      setIsAuthing(true);
      login(code);
    }
  }

  return <Modal
    animationType="slide"
    transparent={true}
    visible={!isAuthenticated}
  >
    <WebView
      source={{ uri: DISCORD_AUTH_URL }}
      onNavigationStateChange={handleNavigationChange}
    />
  </Modal>;
}
export default Login;
