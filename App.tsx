import React from 'react';
import {
  StatusBar, TextComponent,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import {ModelProvider} from './src/hooks/ModelContext.tsx';
import TestComponent from "./src/components/TestComponent.tsx";

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <ModelProvider>
      <View style={backgroundStyle}>
        <TestComponent />
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
      </View>
    </ModelProvider>
  );
}

export default App;
