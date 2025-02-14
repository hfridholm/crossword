import {
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged,
  signOut,
  deleteUser as deleteAuthUser
} from "firebase/auth"

import {
  doc, 
  setDoc, 
  getDoc,
  deleteDoc
} from "firebase/firestore"

import {
  httpsCallable
} from "firebase/functions"

export const signUpUser = async (data) => {
  const { $functions } = useNuxtApp()

  console.log("Signing up user:", data)

  httpsCallable($functions, "createUser")(data)

  signInUser(data.email, data.password)
}

export const deleteUser = async (uid) => {
  const { $functions } = useNuxtApp()

  console.log("Deleting user: ", uid)

  httpsCallable($functions, "deleteUser")({uid: uid})

  signOutUser()
}

export const signInUser = async (email, password) => {
  const { $auth } = useNuxtApp()

  return await signInWithEmailAndPassword($auth, email, password)
}

export const signOutUser = async () => {
  const { $auth } = useNuxtApp()

  return await signOut($auth)
}

export const initUser = async () => {
  const { $auth } = useNuxtApp()

  const firebaseUser = useFirebaseUser()

  firebaseUser.value = $auth?.currentUser

  onAuthStateChanged($auth, (user) => {
    if(user) {
      console.log("User has signed in as " + user.uid)
    } else {
      console.log("User has signed out")
    }
    firebaseUser.value = user
  })
}

export const getDocument = async (collection, id) => {
  const { $firestore } = useNuxtApp()

  return await getDoc(doc($firestore, collection, id))
}
