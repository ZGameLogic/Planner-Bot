type Token = {
  token_type: string
  access_token: string
  expires_in: number
  refresh_token: string
  scope: string
}

type User = {
  locale: string
  verified: boolean
  username: string
  global_name: string
  avatar: string
  id: number
}

type DiscordAuth = {
  token: Token
  user: User
}
