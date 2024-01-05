<template>
  <div id="page" class="h-screen flex justify-center items-center bg-gray-100">
    <div class="h-fit">
      <h1 class="sign-title">Sign in</h1>
      <form id="signin-form" @submit.prevent="signin_handler">
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
      <button @click="signout_handler">Sign out</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const email = ref("");
const password = ref("");

function signin_handler()
{
  userSignin(email.value, password.value).then((credentials) => 
  {

  }).catch((error) => 
  {
    console.log("Could not sign in");
  });
}

function signout_handler()
{
  userSignout().then(() => 
  {
  
  });
}
</script>
