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

const firebaseUser = useFirebaseUser()
const route = useRoute()

const tab = ref(route.query.tab)

const user = ref({})

const fatalError = ref(null)

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

function initPage() {
  if(firebaseUser.value) {
    getDocument("users", firebaseUser.value.uid).then((docSnap) => {
      if(!docSnap.exists()) throw createError({
        statusCode: 406,
        statusMessage: "User doc for " + firebaseUser.value.uid + " does not exist"
      })

      const data = docSnap.data()

      const username = data.username

      if(route.params.user === username) {
        console.log(username + " is signed in to his own page")
      } else {
        console.log(username + " is signed in to " + route.params.user + "'s page")
      }
    }).catch((error) => {
      console.log(error)
    })
  } else {
    console.log("Someone is signed in to " + route.params.user + "'s page")
  }
}

// When the page is loaded
onMounted(() => {
  initPage()

  getDocument("usernames", route.params.user).then((docSnap) => {
    if(!docSnap.exists()) throw createError({
      statusCode: 402,
      statusMessage: "Usernames doc for " + route.params.user + " does not exist"
    })

    const data = docSnap.data()

    return getDocument("users", data.uid)
  }).then((docSnap) => {
    if(!docSnap.exists()) throw createError({
      statusCode: 401,
      statusMessage: "User doc for " + route.params.user + " does not exist"
    })

    const data = docSnap.data()

    user.value = data
  }).catch((error) => {
    console.log(error)
    fatalError.value = error
  })
})

// Wait for firebaseUser to be initialized
watch(firebaseUser, () => {
  initPage()
})
</script>
