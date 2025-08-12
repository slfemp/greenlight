import type { Player } from '~/types'

export default eventHandler(async (event) => {
  const teamId = getRouterParam(event, 'id')
  
  if (!teamId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Team ID is required'
    })
  }
  
  // Fetch players for this specific team
  const players = await $fetch<Player[]>(`/api/roster?teamId=${teamId}`)
  
  return players
})
