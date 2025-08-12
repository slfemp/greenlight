export interface Team {
  id: string
  name: string
  abbreviation: string
  division?: string
  coach?: string
  established?: string
  homeField?: string
  primaryColor?: string
  secondaryColor?: string
  playerCount?: number
}

export interface TeamStats {
  teamId: string
  wins: number
  losses: number
  ties: number
  avgPitchCount: number
  totalInningsPitched: number
  injuryRate: number
  complianceRate: number
}
