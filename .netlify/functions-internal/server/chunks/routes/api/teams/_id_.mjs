import { e as eventHandler, b as getRouterParam, c as createError } from '../../../_/nitro.mjs';
import { g as getTeamById } from '../../../_/teams.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import 'node:fs';
import 'node:path';

const _id_ = eventHandler(async (event) => {
  const teamId = getRouterParam(event, "id");
  if (!teamId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Team ID is required"
    });
  }
  const team = getTeamById(teamId);
  if (!team) {
    throw createError({
      statusCode: 404,
      statusMessage: "Team not found"
    });
  }
  const { data: allPlayers } = await $fetch("/api/roster");
  const teamPlayers = allPlayers.filter((player) => player.teamId === teamId);
  const teamStats = {
    ...team,
    playerCount: teamPlayers.length,
    activePlayerCount: teamPlayers.filter((p) => p.status === "green").length,
    cautionPlayerCount: teamPlayers.filter((p) => p.status === "yellow").length,
    restingPlayerCount: teamPlayers.filter((p) => p.status === "red").length
  };
  return teamStats;
});

export { _id_ as default };
//# sourceMappingURL=_id_.mjs.map
