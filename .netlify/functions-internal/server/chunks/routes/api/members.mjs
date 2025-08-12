import { e as eventHandler } from '../../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import 'node:fs';
import 'node:path';

const members = [{
  name: "Derek Piszczek",
  username: "derekpiszcek",
  role: "owner",
  avatar: { src: "https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/benjamincanac" }
}, {
  name: "Derek Piszczek",
  username: "derekpiszcek",
  role: "owner",
  avatar: { src: "" }
}];
const members$1 = eventHandler(async () => {
  return members;
});

export { members$1 as default };
//# sourceMappingURL=members.mjs.map
