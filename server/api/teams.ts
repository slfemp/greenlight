import { TEAMS, getTeamById } from '../data/teams'

export default eventHandler(async (event) => {
  const method = event.method
  
  // GET /api/teams - Get all teams
  if (method === 'GET') {
    return TEAMS
  }
  
  throw createError({
    statusCode: 405,
    statusMessage: 'Method Not Allowed'
  })
})