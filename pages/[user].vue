<template>
  <div id="page" class="">
    <div class="flex justify-center space-x-10">
      <NuxtLink to="?" class="profile-tab">Overview</NuxtLink>
      <NuxtLink to="?tab=crosswords" class="profile-tab">Crosswords</NuxtLink>
      <NuxtLink to="?tab=followers" class="profile-tab">Followers</NuxtLink>
      <NuxtLink to="?tab=following" class="profile-tab">Following</NuxtLink>
    </div>
    <div>
      {{ user }}

      <div v-if="firebaseUser">
        <button v-if="ownPage" class="flex h-min items-center border-solid border-gray-800 border-4 text-2xl text-gray-800 p-1 rounded-lg hover:cursor-pointer">Edit</button>
        <button v-else-if="following" @click="handleUnfollow" class="flex h-min items-center border-solid border-gray-800 border-4 text-2xl text-gray-800 p-1 rounded-lg hover:cursor-pointer">Unfollow</button>
        <button v-else @click="handleFollow" class="flex h-min items-center border-solid border-gray-800 border-4 text-2xl text-gray-800 p-1 rounded-lg hover:cursor-pointer">Follow</button>
      </div>
      <div v-else>
        <NuxtLink to="/signin">
          <button class="flex h-min items-center border-solid border-gray-800 border-4 text-2xl text-gray-800 p-1 rounded-lg hover:cursor-pointer">Follow</button>
        </NuxtLink>
      </div>
    </div>
    <div v-if="tab === 'crosswords'">
      Crosswords
    </div>
    <div v-else-if="tab === 'followers'">
      Followers
    </div>
    <div v-else-if="tab === 'following'">
      Following
    </div>
    <div v-else>
      Overview
    </div>
  </div>
</template>

<script setup>
import {
  ref, 
  watch, 
  onMounted 
} from "vue"

import {
  httpsCallable
} from "firebase/functions"

const firebaseUser = useFirebaseUser()
const route = useRoute()

const tab = ref(route.query.tab)

const user = ref({})

const fatalError = ref(null)

const { $functions } = useNuxtApp()

// When the code determines a fatalError, trigger error page
watch(fatalError, () => {
  throw createError({
    statusCode: fatalError.value.statusCode,
    statusMessage: fatalError.value.statusMessage,
    fatal: true
  })
})

// Watching for changes in the url queries
watch(() => route.query, (newQuery, oldQuery) => {
  tab.value = newQuery.tab
})

var ownPage = false
const following = ref(false)

function handleFollow() {
  return httpsCallable($functions, "unfollowUser")({uid: user.uid})
  .then(result => {
    console.log(result)
    following.value = false
  })
  .catch(error => {
    console.log(error)
  })
}

function handleUnfollow() {
  return httpsCallable($functions, "followUser")({uid: user.uid})
  .then(result => {
    console.log(result)
    following.value = true
  })
  .catch(error => {
    console.log(error)
  })
}

// Get the logged in user
function initPage() {
  if(firebaseUser.value) {
    getDocument("users", firebaseUser.value.uid)
    .then(docSnap => {
      if(!docSnap.exists()) throw createError({
        statusCode: 406,
        statusMessage: "User doc for " + firebaseUser.value.uid + " does not exist"
      })

      const { username } = docSnap.data()

      if(route.params.user === username) {
        console.log(username + " is signed in to his own page")
        ownPage = true
      } else {
        console.log(username + " is signed in to " + route.params.user + "'s page")

        // Check if the user is already following
      }
    })
    .catch(error => {
      console.log(error)
    })
  } else {
    console.log("Someone is signed in to " + route.params.user + "'s page")
  }
}

// Load the user for the current page
function loadUser() {
  return getDocument("usernames", route.params.user)
  .then(docSnap => {
    if(!docSnap.exists()) throw createError({
      statusCode: 402,
      statusMessage: "Usernames doc for " + route.params.user + " does not exist"
    })

    const { uid } = docSnap.data()

    return getDocument("users", uid)
  })
  .then(docSnap => {
    if(!docSnap.exists()) throw createError({
      statusCode: 401,
      statusMessage: "User doc for " + route.params.user + " does not exist"
    })

    user.value = docSnap.data()
  })
  .catch(error => {
    console.log(error)
    fatalError.value = error
  })
}

// When the page is loaded
onMounted(() => {
  initPage()
  loadUser()
})

// Wait for firebaseUser to be initialized
watch(firebaseUser, () => {
  initPage()
})
</script>
