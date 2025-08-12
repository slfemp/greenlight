const members = [{
  name: 'Derek Piszczek',
  username: 'derekpiszcek',
  role: 'owner',
  avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/benjamincanac' }
}, {
  name: 'Derek Piszczek',
  username: 'derekpiszcek',
  role: 'owner',
  avatar: { src: '' }
}]

export default eventHandler(async () => {
  return members
})
