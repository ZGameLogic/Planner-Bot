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

type DiscordUser = {
  username: string
  avatar: string
  id: bigint
}

type DiscordAuth = {
  token: Token
  user: User
}

type EventUser = {
  'user id': bigint
  status: 'DECIDING' | 'ACCEPTED' | 'MAYBED' | 'WAITLISTED' | 'FILLINED' | 'DECLINED'
  'needs fill in': boolean
}

type Plan = {
  id: bigint
  title: string
  notes: string
  'start time': string
  count: number
  'author id': bigint
  invitees: [EventUser]
}
