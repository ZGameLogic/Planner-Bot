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
    console.log('Button pressed');
  }

  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{route}</Text>
      <View style={styles.headerButtons}>
        <TouchableOpacity onPress={handlePress} style={styles.headerButton}>
          <DiscordProfileIcon
            size={35}
            avatar={userData?.user.avatar ?? ''}
            id={userData?.user.id ?? ''}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePress}>
          <FontAwesome6
            name="calendar-plus"
            iconStyle="solid"
            size={30}
            color={'purple'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Header;
