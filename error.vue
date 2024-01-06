<template>
  <div id="page" class="h-screen flex flex-col justify-center items-center bg-gray-100 space-y-6">
    <h1 class="text-8xl text-gray-800">{{ error.statusCode }}</h1>
    <p class="text-2xl text-gray-600">{{ error.statusMessage }}</p>
    <button @click="clearError({redirect: '/'})" class="flex h-min items-center border-solid border-gray-800 border-4 text-4xl text-gray-800 p-2 rounded-lg hover:cursor-pointer">Back</button>
  </div>
</template>

<script setup>
const props = defineProps(["error"])
</script>
