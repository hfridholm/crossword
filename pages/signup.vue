<template>
  <div id="page" class="h-screen flex justify-center items-center bg-gray-100">
    <div class="h-fit">
      <h1 class="sign-title">Sign up</h1>
      <form id="signup-form">
        <div class="sign-label-input">
          <label class="sign-label" for="signup-name">Name</label>
          <input class="sign-input" id="signup-name" type="name" required/>
        </div>
        <div class="sign-label-input">
          <label class="sign-label" for="signup-email">Email</label>
          <input class="sign-input" id="signup-email" type="email" required />
        </div>
        <div class="sign-label-input">
          <label class="sign-label" for="signup-password">Password</label>
          <input class="sign-input" id="signup-password" type="password" required />
        </div>
        <div class="sign-label-input">
          <label class="sign-label" for="signup-confirm">Confirm</label>
          <input class="sign-input" id="signup-confirm" type="password" required />
        </div>
        <div class="sign-button-div">
          <button class="sign-button bg-gray-400">Sign up</button>
        </div>
      </form>
    </div>
  </div>
</template>
