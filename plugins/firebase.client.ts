import {
  initializeApp 
} from "firebase/app"

import {
  getFirestore, 
  connectFirestoreEmulator
} from "firebase/firestore"

import {
  getAuth,
  connectAuthEmulator
} from "firebase/auth"

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  // The Firebase API variables should not really be stored in public
  const app = initializeApp(config.public.firebase)

  const auth = getAuth(app)
  const firestore = getFirestore(app)

  // Initialize Firebase with local emulator
  connectAuthEmulator(auth, "http://localhost:9099")
  connectFirestoreEmulator(firestore, "localhost", 8080)

  nuxtApp.provide("auth", auth)
  nuxtApp.provide("firestore", firestore)

  initUser()
})
