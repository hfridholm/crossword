const functions = require("firebase-functions")
const admin = require("firebase-admin")

exports.deleteUser = functions.https.onCall((data, context) => {
  const { uid } = data

  console.log("uid: ", uid)
  console.log("context.auth.uid: ", context.auth.uid)

  if(uid !== context.auth.uid && context.auth.token.admin !== true) {
    throw new functions.https.HttpsError("unknown", "Only the user himself, or an admin, can delete an account")
  }
  
  return admin.firestore().collection('users').doc(uid).get()
  .then(doc => {
    if(!doc.exists) {
      throw new functions.https.HttpsError("not-found", "User not found")
    }

    const { username } = doc.data()

    return admin.firestore().collection("users").doc(uid).delete()
      .then(() => {
        return admin.firestore().collection("usernames").doc(username).delete()
      })
  })
  .then(() => {
    admin.auth().deleteUser(uid)
  })
  .catch(error => {
    console.log(error)
    throw new functions.https.HttpsError("unknown", error.message, error)
  })
})
