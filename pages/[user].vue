<template>
  <div id="page" class="">

  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";

const firebaseUser = useFirebaseUser();
const route = useRoute();

function initPage()
{
  if(firebaseUser.value)
  {
    getDocument("users", firebaseUser.value.uid).then((docSnap) =>
    {
      if(!docSnap.exists()) return;

      const data = docSnap.data();

      const username = data.username;

      if(route.params.user === username)
      {
        console.log(username + " is signed in to his own page");
      }
      else
      {
        console.log(username + " is signed in to " + route.params.user + "'s page");
      }
    }).catch((error) => 
    {

    });
  }
  else
  {
    console.log("Someone is signed in to " + route.params.user + "'s page");
  }
}

// When the page is loaded
onMounted(() =>
{
  initPage();
});

// Wait for firebaseUser to be initialized
watch(firebaseUser, () =>
{
  initPage();
});
</script>
