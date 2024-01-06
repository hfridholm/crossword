<template>
  <header class="flex justify-between p-1 pr-2 pl-2 h-16 border-solid border-gray-200 border-b-2">
    <div class="flex">
      <NuxtLink v-if="firebaseUser" :to="username" class="flex items-center text-2xl text-gray-800 hover:cursor-pointer">Profile</NuxtLink>
    </div>
    <div class="flex justify-end space-x-5 items-center">
      <NuxtLink v-if="firebaseUser" @click="handleSignOut" class="flex items-center text-2xl text-gray-800 hover:cursor-pointer">Sign out</NuxtLink>
      <NuxtLink v-if="!firebaseUser" to="/signin" class="flex items-center text-2xl text-gray-800 hover:cursor-pointer">Sign in</NuxtLink>
      <NuxtLink v-if="!firebaseUser" to="/signup" class="flex h-min items-center border-solid border-gray-800 border-4 text-2xl text-gray-800 p-1 rounded-lg hover:cursor-pointer">Sign up</NuxtLink>
    </div>
  </header>
  <main class="h-screen">
    <slot />
  </main>
  <footer class="">

  </footer>
</template>

<script setup>
const firebaseUser = useFirebaseUser()

const username = ref("")

// Wait for firebaseUser to be initialized
watch(firebaseUser, () => {
  if(firebaseUser.value) {
    getDocument("users", firebaseUser.value.uid).then((docSnap) => {
      if(!docSnap.exists()) return

      const data = docSnap.data()

      username.value = data.username
    })
  }
})

function handleSignOut() {
  signOutUser().then(() => {
    
  }).catch((error) => {
    console.log("Could not sign out")
  })
}
</script>
