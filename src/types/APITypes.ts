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
  id: string
}

type DiscordAuth = {
  token: Token
  user: User
}

type EventUser = {
  id: bigint
  status: boolean
  isNeedFillIn: boolean
}

type Plan = {
  id: bigint
  title: string
  notes: string
  startTime: bigint
  count: number
  authorId: bigint
  users: [EventUser]
}
