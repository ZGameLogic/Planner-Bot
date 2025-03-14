import React from 'react';
import Login from './Login.tsx';
import {SafeAreaView, useColorScheme, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useAuth} from '../hooks/AuthContext.tsx';

function Main(): React.JSX.Element {
  const { isAuthenticated, isAuthing } = useAuth();
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return <SafeAreaView>
    <View style={backgroundStyle}>
      {(!isAuthenticated || !isAuthing) && <Login/>}
    </View>
  </SafeAreaView>;
}

export default Main;
