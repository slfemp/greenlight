import type { AvatarProps } from '@nuxt/ui'
export type { Team, TeamStats } from './team'

export type UserStatus = 'subscribed' | 'unsubscribed' | 'bounced'
export type PlayerStatus = 'green' | 'yellow' | 'red'
export type SaleStatus = 'paid' | 'failed' | 'refunded'

export interface User {
  id: number
  name: string
  email: string
  avatar?: AvatarProps
  status: UserStatus
  location: string
}

export interface Player {
  id: number
  name: string
  avatar?: AvatarProps
  status: PlayerStatus
  teamId?: string
  position?: string
  jerseyNumber?: string
  birthDate?: string
  stats?: PlayerGameStat[]
  lastUpdate?: string
}

export interface PlayerGameStat {
  date: string
  pitchCount: number
  pitchesPerInning: number
  inningsPitched: number
  restDays: number
}

export interface Mail {
  id: number
  unread?: boolean
  from: User
  subject: string
  body: string
  date: string
}

export interface Member {
  name: string
  username: string
  role: 'member' | 'owner'
  avatar: Avatar
}

export interface Stat {
  title: string
  icon: string
  value: number | string
  variation: number
  formatter?: (value: number) => string
}

export interface Sale {
  id: string
  date: string
  status: SaleStatus
  email: string
  amount: number
}

export interface Notification {
  id: number
  unread?: boolean
  sender: User
  body: string
  date: string
}

export type Period = 'daily' | 'weekly' | 'monthly'

export interface Range {
  start: Date
  end: Date
}
