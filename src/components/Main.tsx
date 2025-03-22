import React from 'react';
import Login from './Login.tsx';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import Header from './Header.tsx';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import EventsList from './EventsList.tsx';
import styles from 'react-native-webview/lib/WebView.styles';

const Stack = createNativeStackNavigator();

function Main(): React.JSX.Element {

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container]}>
        <Login/>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={({ route }) => ({
              header: () => <Header route={route.name}/>,
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
