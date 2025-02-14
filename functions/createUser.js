const functions = require("firebase-functions")
const admin = require("firebase-admin")

exports.createUser = functions.https.onCall((data, context) => {
  const { email, password, displayName, username } = data

  return admin.auth().createUser({ email, password })
  .then(userRecord => {
    const uid = userRecord.uid

    return admin.firestore().collection("users").doc(uid).set({
      displayName: displayName,
      username: username
    })
    .then(() => {
      return admin.firestore().collection("usernames").doc(username).set({
        uid: uid
      })
    })
    .then(() => {
      return { message: "User created successfully" }
    })
  })
  .catch(error => {
    console.log(error)
    throw new functions.https.HttpsError("unknown", error.message, error)
  })
})
