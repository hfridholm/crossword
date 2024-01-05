import {
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged,
  signOut
} from "firebase/auth"

import {
  doc, 
  setDoc, 
  getDoc 
} from "firebase/firestore"

export const signUpUser = async (email, password, displayName, username) => {
  const { $auth, $firestore } = useNuxtApp()

  return await createUserWithEmailAndPassword($auth, email, password).then((credentials) => {
    return setDoc(doc($firestore, "users", credentials.user.uid), {
      displayName: displayName,
      username: username
    })
  }).then(() => {

  }).catch((error) => {

  })
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
