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

export const signUpUser = async (email, password, displayName, username) => {
  const { $auth, $firestore } = useNuxtApp()

  return await createUserWithEmailAndPassword($auth, email, password).then((credentials) => {
    return setDoc(doc($firestore, "users", credentials.user.uid), {
      displayName: displayName,
      username: username
    })
  }).then(() => {
    return setDoc(doc($firestore, "usernames", username), {
      uid: $auth.currentUser.uid
    })
  }).catch((error) => {
    console.log(error)
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

export const deleteUser = async () => {
  const { $auth, $firestore } = useNuxtApp()

  if(!$auth.currentUser) return await createError({
    statusCode: 409,
    statusMessage: "User not logged in"
  })

  const user = $auth.currentUser

  var username = null

  return await getDoc(doc($firestore, "users", user.uid)).then((docSnap) => {
    if(!docSnap.exists()) throw createError({
      statusCode: 406,
      statusMessage: "User doc for " + user.uid + " does not exist"
    })

    const data = docSnap.data()

    username = data.username

    return deleteDoc(doc($firestore, "users", user.uid))
  }).then(() => {
    return deleteDoc(doc($firestore, "usernames", username))
  }).then(() => {
    return deleteAuthUser(user)
  }).then(() => {
    console.log("Deleted user: " + username)

    return navigateTo("/")
  }).catch((error) => {
    console.log(error)
  })
}

export const getDocument = async (collection, id) => {
  const { $firestore } = useNuxtApp()

  return await getDoc(doc($firestore, collection, id))
}
