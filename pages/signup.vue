<template>
  <div id="page" class="h-screen flex justify-center items-center bg-gray-100">
    <div class="h-fit">
      <h1 class="sign-title">Sign up</h1>
      <form id="signup-form" @submit.prevent="signup_handler">
        <div class="sign-label-input">
          <label class="sign-label" for="signup-display-name">Display Name</label>
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
          <label class="sign-label" for="signup-confirm">Confirm Password</label>
          <input class="sign-input" id="signup-confirm" type="password" required v-model="confirmPassword" />
        </div>
        <div class="sign-button-div">
          <button class="sign-button bg-gray-400" type="submit">Sign up</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const displayName = ref("");
const username = ref("");
const email = ref("");

const password = ref("");
const confirmPassword = ref("");

function signup_handler()
{
  if(password.value != confirmPassword.value)
  {
    console.log("Different inputted passwords");

    return null;
  }

  // This should already be checked in the form
  if(!displayName.value || !email.value || !password.value)
  {
    console.log("Form not fully inputted");

    return null;
  }

  userSignup(email.value, password.value, displayName.value, username.value).then(() =>
  {
    console.log("Signed up user");
  }).catch((error) =>
  {
    console.log("Could not sign up");
    console.log(error.message);
  });
}
</script>
