import React from 'react';
import { Image } from 'react-native';
import FontAwesome6 from "@react-native-vector-icons/fontawesome6";

interface DiscordProfileIconProps {
  size: number
  avatar: string
  id: string | bigint
}

function DiscordProfileIcon({size, avatar, id}: DiscordProfileIconProps): React.JSX.Element {
  const uri = `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`;
  if(!avatar) {
    return <FontAwesome6
      name="user"
      iconStyle="regular"
      size={size}
      color={'purple'}
    />
  }
  return <Image
    source={{ uri: uri }}
    style={{ width: size, height: size, borderRadius: size / 2 }}
  />;
}

export default DiscordProfileIcon;
