<template>
  <div id="page" class="h-screen flex justify-center items-center bg-gray-100">
    <div class="h-fit">
      <h1 class="sign-title">Sign up</h1>
      <form id="signup-form" @submit.prevent="handleSignUp">
        <div class="sign-label-input">
          <label class="sign-label" for="signup-display-name">Display name</label>
          <input class="sign-input" id="signup-display-name" type="name" required v-model="displayName" />
        </div>
        <div class="sign-label-input">
          <label class="sign-label" for="signup-username">Username</label>
          <input class="sign-input" id="signup-username" type="name" required v-model="username" />
        </div>
        <div class="sign-label-input">
          <label class="sign-label" for="signup-email">Email</label>
          <input class="sign-input" id="signup-email" type="email" required v-model="email" />
        </div>
        <div class="sign-label-input">
          <label class="sign-label" for="signup-password">Password</label>
          <input class="sign-input" id="signup-password" type="password" required v-model="password" />
        </div>
        <div class="sign-label-input">
          <label class="sign-label" for="signup-confirm">Confirm password</label>
          <input class="sign-input" id="signup-confirm" type="password" required v-model="confirmPassword" />
        </div>
        <div class="sign-button-div">
          <button class="sign-button bg-gray-400" type="submit">Sign up</button>
        </div>
      </form>
      <p class="sign-question">Already have an account? <NuxtLink class="sign-question-link" to="/signin">Sign in</NuxtLink></p>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"]
})

import {
  ref
} from "vue"

const displayName = ref("")
const username = ref("")
const email = ref("")

const password = ref("")
const confirmPassword = ref("")

function handleSignUp() {
  if(password.value != confirmPassword.value) {
    console.log("Different inputted passwords")

    return {
      error: "Different inputted passwords"
    }
  }

  // This should already be checked in the form
  if(!displayName.value || !email.value || !password.value) {
    console.log("Form not fully inputted")

    return {
      error: "Form not fully inputted"
    }
  }

  return signUpUser({
    email: email.value,
    password: password.value,
    displayName: displayName.value,
    username: username.value
  })
  .then(() => {
    console.log("Signed up user")
  })
  .catch(error => {
    console.log("Could not sign up")
    console.log(error.message)
  })
}
</script>
