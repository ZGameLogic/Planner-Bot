import React from 'react';
import {DISCORD_AUTH_URL} from '@env';
import { WebView } from 'react-native-webview';
import {View} from 'react-native';

function Login(): React.JSX.Element {
  function handleNavigationChange(event: any) {
    console.log(event);
  }

  return <View style={{ flex: 1 }}>
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
      incognito // Optional: Prevents session persistence
      thirdPartyCookiesEnabled
      sharedCookiesEnabled
    />
  </View>;
}

export default Login;
