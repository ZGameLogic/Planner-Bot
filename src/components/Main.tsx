import React from 'react';
import Login from './Login.tsx';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import HeaderButtons from './HeaderButtons.tsx';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import EventsList from './events/EventsList.tsx';
import styles from 'react-native-webview/lib/WebView.styles';
import {headerStyles} from '../styles/headerStyles.ts';
import {Appearance} from 'react-native';

const Stack = createNativeStackNavigator();

function Main(): React.JSX.Element {
  const colorScheme = Appearance.getColorScheme();
  const hstyles = headerStyles(colorScheme);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container]}>
        <Login/>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={({ route }) => ({
              headerStyle: hstyles.header,
              title: route.name,
              headerLargeTitle: true,
              headerTitleStyle: hstyles.headerText,
              headerRight: () => <HeaderButtons />
            })}
          >
            <Stack.Screen
              name="Events"
              component={EventsList}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default Main;
