import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default defineNuxtPlugin((nuxtApp) =>
{
  const config = useRuntimeConfig();

  // The Firebase API variables should not really be stored in public
  const app = initializeApp(config.public.firebase);

  const auth = getAuth(app);
  const firestore = getFirestore(app);

  nuxtApp.provide("auth", auth);
  nuxtApp.provide("firestore", firestore);

  userInit();
});
