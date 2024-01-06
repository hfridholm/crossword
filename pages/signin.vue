<template>
  <div id="page" class="h-screen flex justify-center items-center bg-gray-100">
    <div class="h-fit">
      <h1 class="sign-title">Sign in</h1>
      <form id="signin-form" @submit.prevent="handleSignIn">
        <div class="sign-label-input">
          <label class="sign-label" for="signin-email">Email</label>
          <input class="sign-input" id="signin-email" type="email" required v-model="email" />
        </div>
        <div class="sign-label-input">
          <label class="sign-label" for="signin-password">Password</label>
          <input class="sign-input" id="signin-password" type="password" required v-model="password" />
        </div>
        <div class="sign-button-div">
          <button class="sign-button bg-green-400" type="submit">Sign in</button>
        </div>
      </form>
      <p class="sign-question">Don't have an account? <NuxtLink class="sign-question-link" to="/signup">Sign up</NuxtLink></p>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"]
})

import { ref } from "vue"

const email = ref("")
const password = ref("")

function handleSignIn() {
  signInUser(email.value, password.value).then((credentials) => {

  }).catch((error) => {
    console.log("Could not sign in")
  })
}
</script>
