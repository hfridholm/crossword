<template>
  <div v-if="firebaseUser" class="">
    <h1>{{ username }}</h1>
    <button @click="handleDeleteUser" class="flex h-min items-center border-solid border-gray-800 border-4 text-2xl text-gray-800 p-1 rounded-lg hover:cursor-pointer">Delete account</button>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"]
})

import {
  ref,
  watch, 
  onMounted 
} from "vue"

import {
  doc,
  getDoc
} from "firebase/firestore"

const { $firestore } = useNuxtApp()

const firebaseUser = useFirebaseUser()

const username = ref("")

// Watch if the user gets signed out, and redirect to /signin
watch(firebaseUser, () => {
  if(!firebaseUser.value) {
    return navigateTo("/signin")
  }
})

function initPage() {
  if(firebaseUser.value) {
    getDoc(doc($firestore, "users", firebaseUser.value.uid)).then((docSnap) => {
      if(!docSnap.exists()) throw createError({
        statusCode: 406,
        statusMessage: "User doc for " + firebaseUser.value.uid + " does not exist"
      })

      const data = docSnap.data()

      username.value = data.username
    }).catch((error) => {
      console.log(error)
    })
  }
}

watch(firebaseUser, () => {
  initPage()
})

onMounted(() => {
  initPage()
})

function handleDeleteUser() {
  console.log("Deleting user " + username.value + "...")

  deleteUser(username.value)
}
</script>
