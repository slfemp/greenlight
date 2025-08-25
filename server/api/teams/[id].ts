import { getTeamById } from '../../data/teams'

// Import players data directly to avoid HTTP calls within server routes
const players = [
  { id: 1, name: 'Alex Smith', status: 'green', teamId: 'gll' },
  { id: 2, name: 'Jordan Brown', status: 'yellow', teamId: 'rcr' },
  { id: 3, name: 'Taylor Green', status: 'red', teamId: 'cc' },
  { id: 4, name: 'Morgan White', status: 'yellow', teamId: 'mm' },
  { id: 5, name: 'Casey Gray', status: 'red', teamId: 'dd' },
  { id: 6, name: 'Jamie Johnson', status: 'green', teamId: 'ccc' },
  { id: 7, name: 'Riley Davis', status: 'yellow', teamId: 'hh' },
  { id: 8, name: 'Kelly Wilson', status: 'red', teamId: 'pp' },
  { id: 9, name: 'Drew Moore', status: 'green', teamId: 'scs' },
  { id: 10, name: 'Jordan Taylor', status: 'yellow', teamId: 'bab' },
  { id: 11, name: 'Morgan Anderson', status: 'red', teamId: 'gll' },
  { id: 12, name: 'Casey Thomas', status: 'green', teamId: 'rcr' },
  { id: 13, name: 'Jamie Jackson', status: 'yellow', teamId: 'cc' },
  { id: 14, name: 'Riley White', status: 'red', teamId: 'mm' },
  { id: 15, name: 'Kelly Harris', status: 'green', teamId: 'dd' },
  { id: 16, name: 'Drew Martin', status: 'yellow', teamId: 'ccc' },
  { id: 17, name: 'Alex Thompson', status: 'red', teamId: 'hh' },
  { id: 18, name: 'Jordan Garcia', status: 'green', teamId: 'pp' },
  { id: 19, name: 'Taylor Rodriguez', status: 'yellow', teamId: 'scs' },
  { id: 20, name: 'Morgan Lopez', status: 'red', teamId: 'bab' }
]

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
  
  // Filter players for this team
  const teamPlayers = players.filter(player => player.teamId === teamId)
  
  // Calculate team statistics
  const teamStats = {
    ...team,
    playerCount: teamPlayers.length,
    activePlayerCount: teamPlayers.filter(p => p.status === 'green').length,
    cautionPlayerCount: teamPlayers.filter(p => p.status === 'yellow').length,
    restingPlayerCount: teamPlayers.filter(p => p.status === 'red').length
  }
  
  return { data: teamStats }
})
