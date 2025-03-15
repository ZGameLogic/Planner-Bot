import React from 'react';
import { Image } from 'react-native';

interface DiscordProfileIconProps {
  size: number
  avatar: string
  id: string
}

function DiscordProfileIcon({size, avatar, id}: DiscordProfileIconProps): React.JSX.Element {
  const uri = `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`;
  return <Image
    source={{ uri: uri }}
    style={{ width: size, height: size, borderRadius: size / 2 }}
  />;
}

export default DiscordProfileIcon;
