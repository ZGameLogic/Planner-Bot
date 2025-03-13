import React from 'react';
import { DISCORD_AUTH_URL } from '@env';
import { WebView } from 'react-native-webview';
import { Modal } from 'react-native';
import { useAuth } from '../hooks/AuthContext.tsx';

function Login(): React.JSX.Element {
  const { isAuthenticated } = useAuth();
  function handleNavigationChange(event: any) {
    console.log(event);
  }

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
