type Config = {
  DISCORD_AUTH_URL: string
  BOT_BASE_URL: string
}

export const config: Config = __DEV__ ? {
  DISCORD_AUTH_URL: 'https://discord.com/oauth2/authorize?client_id=738851336564768868&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A2001%2Fcallback%2Fmobile&scope=identify',
  BOT_BASE_URL: 'https://discord-dev.zgamelogic.com',
} : {
  DISCORD_AUTH_URL: 'https://discord.com/oauth2/authorize?client_id=812095163194671104&response_type=code&redirect_uri=https%3A%2F%2Fzgamelogic.com&scope=identify',
  BOT_BASE_URL: 'https://discord.zgamelogic.com',
};

