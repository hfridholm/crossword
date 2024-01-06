export default defineNuxtRouteMiddleware((to, from) => {
  const firebaseUser = useFirebaseUser()

  if(!firebaseUser.value) {
    if(to.path === "/settings") {
      return navigateTo("/signin")
    }
  }

  watch(firebaseUser, () => {
    if(firebaseUser.value) {
      if(to.path === "/signin" || to.path === "/signup") {
        return navigateTo("/")
      }
    }
  })
})
