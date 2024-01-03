<template>
  <div id="page" class="h-screen flex justify-center items-center bg-gray-100">
    <div class="h-fit">
      <h1 class="sign-title">Sign in</h1>
      <form id="signin-form">
        <div class="sign-label-input">
          <label class="sign-label" for="signin-email">Email</label>
          <input class="sign-input" id="signin-email" type="email" required />
        </div>
        <div class="sign-label-input">
          <label class="sign-label" for="signin-password">Password</label>
          <input class="sign-input" id="signin-password" type="password" required />
        </div>
        <div class="sign-button-div">
          <button class="sign-button bg-green-400">Sign in</button>
        </div>
      </form>
    </div>
  </div>
</template>
