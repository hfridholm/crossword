export default defineNuxtRouteMiddleware((to, from) => {
  const firebaseUser = useFirebaseUser()

  watch(firebaseUser, () => {
    if(firebaseUser.value) {
      if(to.path === "/signin" || to.path === "/signup") {
        return navigateTo("/")
      }
    }
  })
})
