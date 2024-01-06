<template>
  <NuxtLink :to="user.username">
    <div class="flex flex-col bg-gray-200 p-2 rounded-lg">
      <p class="text-2xl text-gray-800">{{ user.displayName }}</p>
      <p class="text-md text-gray-800">{{ user.username }}</p>
    </div>
  </NuxtLink>
</template>

<script setup>
const { user } = defineProps(["user"])
</script>
