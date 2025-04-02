import React from 'react';
import { Appearance, TouchableOpacity, View } from 'react-native';
import { headerStyles } from '../styles/headerStyles';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import DiscordProfileIcon from './DiscordProfileIcon';
import { useAuth } from '../hooks/AuthContext';
import { APP_COLOR } from '../helpers/constants';

function HeaderButtons(): React.JSX.Element {
  const { userData } = useAuth();

  const colorScheme = Appearance.getColorScheme();
  const styles = headerStyles(colorScheme);

  function handlePress() {
    console.log('Button pressed');
  }

  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={handlePress} style={styles.headerButton}>
        <DiscordProfileIcon
          size={35}
          avatar={userData?.user.avatar ?? ''}
          id={userData?.user.id ?? ''}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePress} style={styles.headerButton}>
        <FontAwesome6
          name="calendar-plus"
          iconStyle="solid"
          size={30}
          color={APP_COLOR}
        />
      </TouchableOpacity>
    </View>
  );
}

export default HeaderButtons;
