<template>
  <div id="page" class="h-screen flex justify-center items-center bg-gray-100">
    <div class="h-fit">
      <h1 class="sign-title">Sign up</h1>
      <form id="signup-form" @submit.prevent="signup_handler">
        <div class="sign-label-input">
          <label class="sign-label" for="signup-name">Name</label>
          <input class="sign-input" id="signup-name" type="name" required v-model="inputName" />
        </div>
        <div class="sign-label-input">
          <label class="sign-label" for="signup-email">Email</label>
          <input class="sign-input" id="signup-email" type="email" required v-model="inputEmail" />
        </div>
        <div class="sign-label-input">
          <label class="sign-label" for="signup-password">Password</label>
          <input class="sign-input" id="signup-password" type="password" required v-model="inputPassword" />
        </div>
        <div class="sign-label-input">
          <label class="sign-label" for="signup-confirm">Confirm</label>
          <input class="sign-input" id="signup-confirm" type="password" required v-model="inputConfirm" />
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

const inputName = ref("");
const inputEmail = ref("");
const inputPassword = ref("");
const inputConfirm = ref("");

function signup_handler()
{
  if(inputPassword.value != inputConfirm.value)
  {
    console.log("Different inputted passwords");

    return null;
  }

  userSignup(inputEmail.value, inputPassword.value).then((credential) =>
  {

  }).catch((error) =>
  {
    console.log("Could not sign up");
  });
}
</script>
