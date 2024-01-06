<template>
  <header class="flex justify-between p-1 pr-2 pl-2 h-16 border-solid border-gray-200 border-b-2">
    <div class="flex justify-start items-center">
      <NuxtLink to="/" class="flex items-center text-2xl text-gray-800 hover:cursor-pointer">Home</NuxtLink>
    </div>
    <div v-if="firebaseUser" class="flex justify-start space-x-5 items-center">
      <NuxtLink :to="username" class="flex items-center text-2xl text-gray-800 hover:cursor-pointer">Profile</NuxtLink>
      <NuxtLink to="settings" class="flex items-center text-2xl text-gray-800 hover:cursor-pointer">Settings</NuxtLink>
    </div>
    <div class="flex items-center justify-center">
      <form @submit.prevent="handleSearch" class="flex w-full justify-center">
        <input v-model="search" name="search" placeholder="Search" class="border-solid border-gray-800 border-2 p-1 rounded-md w-full ml-10 mr-10">
      </form>
    </div>
    <div v-if="firebaseUser" class="flex justify-end space-x-5 items-center">
      <NuxtLink @click="handleSignOut" class="flex items-center text-2xl text-gray-800 hover:cursor-pointer">Sign out</NuxtLink>
    </div>
    <div v-if="!firebaseUser" class="flex justify-end space-x-5 items-center">
      <NuxtLink to="/signin" class="flex items-center text-2xl text-gray-800 hover:cursor-pointer">Sign in</NuxtLink>
      <NuxtLink to="/signup" class="flex h-min items-center border-solid border-gray-800 border-4 text-2xl text-gray-800 p-1 rounded-lg hover:cursor-pointer">Sign up</NuxtLink>
    </div>
  </header>
  <main class="h-screen">
    <slot />
  </main>
  <footer class="">

  </footer>
</template>

<script setup>
import { ref, watch } from "vue"
import { navigateSearch } from "~/composables/useSearch"

const firebaseUser = useFirebaseUser()

const route = useRoute()
const search = ref(route.query.q)

const username = ref("")

// When not searching, clear the search input field
watch(() => route.path, () => {
  if(route.path !== "/search") {
    search.value = ""
  }
})

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

// Search for whats inputted 
const handleSearch = async () => {
  // Only keep queries if they come from earlier search
  const newQuery = (route.path === "/search") ? {...route.query}: {}

  newQuery.q = search.value

  return navigateSearch(newQuery)
}

function handleSignOut() {
  signOutUser().then(() => {
    return navigateTo("/signin")
  }).catch((error) => {
    console.log(error)
  })
}
</script>
