import React from 'react';
import Login from './Login.tsx';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../hooks/AuthContext.tsx';
import styles from 'react-native-webview/lib/WebView.styles';
import Header from './Header.tsx';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import EventsList from './EventsList.tsx';

const Stack = createNativeStackNavigator();

function Main(): React.JSX.Element {
  const { isAuthenticated, isAuthing } = useAuth();

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={[styles.container]}>
      {(!isAuthenticated || !isAuthing) && <Login />}
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
    </View>
  );
}

export default Main;
