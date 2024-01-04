import {
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged,
  signOut
} from "firebase/auth";

export const userSignup = async (email, password) =>
{
  const { $auth } = useNuxtApp();

  return await createUserWithEmailAndPassword($auth, email, password);
}

export const userSignin = async (email, password) =>
{
  const { $auth } = useNuxtApp();

  return await signInWithEmailAndPassword($auth, email, password);
}

export const userSignout = async () =>
{
  const { $auth } = useNuxtApp();

  return await signOut($auth);
}

export const userInit = async () =>
{
  const { $auth } = useNuxtApp();

  onAuthStateChanged($auth, (user) =>
  {
    if(user)
    {
      console.log("User has signed in as " + user.uid);
    }
    else
    {
      console.log("User has signed out");
    }
  });
}
