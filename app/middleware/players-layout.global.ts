export default defineNuxtRouteMiddleware((to) => {
  if (to.path.startsWith('/players')) {
    to.meta.layout = 'mobile'
  }
})


