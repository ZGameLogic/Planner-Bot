import React, {useEffect} from 'react';
import {
  Linking,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import {ModelProvider} from './src/hooks/ModelContext.tsx';
import Login from './src/components/Login.tsx';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <ModelProvider>
      <View style={backgroundStyle}>
        <Login/>
      </View>
    </ModelProvider>
  );
}

export default App;
