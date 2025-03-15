import React from 'react';
import Login from './Login.tsx';
import {ScrollView, Text, View} from 'react-native';
import {useAuth} from '../hooks/AuthContext.tsx';

function Main(): React.JSX.Element {
  const { isAuthenticated, isAuthing, userData } = useAuth();

  return <View style={{flex: 1}}>
    {(!isAuthenticated || !isAuthing) && <Login/>}
    <ScrollView>
      <Text>gyat</Text>
      <Text>{userData?.user.global_name}</Text>
      <Text>gyat</Text>
      <Text>{userData?.user.global_name}</Text>
      <Text>gyat</Text>
      <Text>{userData?.user.global_name}</Text>
      <Text>gyat</Text>
      <Text>{userData?.user.global_name}</Text>
      <Text>gyat</Text>
      <Text>{userData?.user.global_name}</Text>
      <Text>gyat</Text>
      <Text>{userData?.user.global_name}</Text>
      <Text>gyat</Text>
      <Text>{userData?.user.global_name}</Text>
    </ScrollView>
  </View>;
}

export default Main;
