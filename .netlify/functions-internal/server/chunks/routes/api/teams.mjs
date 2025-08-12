import { e as eventHandler, c as createError } from '../../_/nitro.mjs';
import { T as TEAMS } from '../../_/teams.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import 'node:fs';
import 'node:path';

const teams = eventHandler(async (event) => {
  const method = event.method;
  if (method === "GET") {
    return TEAMS;
  }
  throw createError({
    statusCode: 405,
    statusMessage: "Method Not Allowed"
  });
});

export { teams as default };
//# sourceMappingURL=teams.mjs.map
