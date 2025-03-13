import React from 'react';
import { DISCORD_AUTH_URL } from '@env';
import { WebView } from 'react-native-webview';
import { Modal } from 'react-native';
import { useAuth } from '../hooks/AuthContext.tsx';

function Login(): React.JSX.Element {
  const { isAuthenticated, login } = useAuth();
  function handleNavigationChange(event: any) {
    const code = event.url.match(/code=([^&]+)/)?.[1];
    if(code){
      login(code);
    }
  }

  //?code=hBTGq7Q8DDd1yQ0e8aOyAb1f0MOCVG
  return <Modal
    animationType="slide"
    transparent={true}
    visible={!isAuthenticated}
    // onRequestClose={() => setModalVisible(false)}
  >
    <WebView
      source={{ uri: DISCORD_AUTH_URL }}
      onNavigationStateChange={handleNavigationChange}
      javaScriptEnabled
      domStorageEnabled
      onError={(syntheticEvent) => {
        const { nativeEvent } = syntheticEvent;
        console.error('WebView error: ', nativeEvent);
      }}
      onHttpError={(syntheticEvent) => {
        const { nativeEvent } = syntheticEvent;
        console.error('HTTP error: ', nativeEvent.statusCode);
      }}
      startInLoadingState
      thirdPartyCookiesEnabled
      sharedCookiesEnabled
    />
  </Modal>;
}
export default Login;
