import { e as eventHandler, b as getRouterParam, c as createError } from '../../../../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import 'node:fs';
import 'node:path';

const players = eventHandler(async (event) => {
  const teamId = getRouterParam(event, "id");
  if (!teamId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Team ID is required"
    });
  }
  const players = await $fetch(`/api/roster?teamId=${teamId}`);
  return players;
});

export { players as default };
//# sourceMappingURL=players.mjs.map
