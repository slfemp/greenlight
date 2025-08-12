import { getTeamById } from '../../data/teams'
import type { Player } from '~/types'

export default eventHandler(async (event) => {
  const teamId = getRouterParam(event, 'id')
  
  if (!teamId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Team ID is required'
    })
  }
  
  const team = getTeamById(teamId)
  
  if (!team) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Team not found'
    })
  }
  
  // Get players for this team
  const { data: allPlayers } = await $fetch<Player[]>('/api/roster')
  const teamPlayers = allPlayers.filter(player => player.teamId === teamId)
  
  // Calculate team statistics
  const teamStats = {
    ...team,
    playerCount: teamPlayers.length,
    activePlayerCount: teamPlayers.filter(p => p.status === 'green').length,
    cautionPlayerCount: teamPlayers.filter(p => p.status === 'yellow').length,
    restingPlayerCount: teamPlayers.filter(p => p.status === 'red').length
  }
  
  return teamStats
})
