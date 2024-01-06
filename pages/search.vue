<template>
  <div class="">
    <div class="flex flex-col items-center">
      <div class="flex justify-center space-x-10">
        <button @click="searchType('users')" class="search-tab">Users</button>
        <button @click="searchType('crosswords')" class="search-tab">Crosswords</button>
      </div>
    </div>
    <div class="">
      <div v-if="queryType == 'users'">
        <h1>Users</h1>
        <div class="flex flex-col space-y-5 m-5">
          <div v-for="user in users" :key="user.username">
            <UserCard :user="user" />
          </div>
        </div>
      </div>
      <div v-if="queryType == 'crosswords'">
        <h1>Crosswords</h1>
      </div>
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
  collection,
  query,
  where,
  getDocs
} from "firebase/firestore"

import {
  navigateSearch
} from "~/composables/useSearch"

const { $firestore } = useNuxtApp()

const route = useRoute()

var queryType = route.query.type ?? "users"

const users = ref([])
const crosswords = ref([])

function initPage() {
  if(queryType == "users") {
    const q = query(collection($firestore, "users"))

    getDocs(q).then((querySnapshot) => {
      users.value = []

      querySnapshot.forEach((doc) => {
        users.value.push(doc.data())
      })
    }).catch((error) => {
      console.log(error)
    })
  } else if(queryType == "crosswords") {
    
  }
}

onMounted(() => {
  initPage()
})

// Watching for changes in the url queries
watch(() => route.query, (newQuery) => {
  queryType = route.query.type ?? queryType

  initPage()
})

// Search for a new type
const searchType = async (newType) => {
  const newQuery = {...route.query}

  newQuery.type = newType

  return navigateSearch(newQuery)
}
</script>
