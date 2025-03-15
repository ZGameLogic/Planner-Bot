import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import { styles } from '../styles/styles.ts';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import DiscordProfileIcon from './DiscordProfileIcon.tsx';
import {useAuth} from '../hooks/AuthContext.tsx';

interface HeaderProps {
  route: string
}

function Header({ route }: HeaderProps): React.JSX.Element {
  const { userData } = useAuth();

  function handlePress() {
    console.log('jjjjjjjjj');
  }

  console.log(route);

  // @ts-ignore
  return <View style={styles.header}>
    <Text style={styles.headerText}>{route}</Text>
    <View style={styles.headerComponent}>
      <TouchableOpacity onPress={handlePress}>
        <DiscordProfileIcon
          size={35}
          avatar={userData?.user.avatar ?? ''}
          id={userData?.user.id ?? ''}
        />
      </TouchableOpacity>
    </View>
    <TouchableOpacity onPress={handlePress}>
      <FontAwesome6
        style={styles.headerComponent}
        name="calendar-plus"
        iconStyle="solid"
        size={30}
        color={'purple'}
      />
    </TouchableOpacity>
  </View>;
}

export default Header;
