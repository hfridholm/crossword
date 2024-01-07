/*
const functions = require("firebase-functions")
const admin = require("firebase-admin")

admin.initializeApp()

exports.addAdminRole = functions.https.onCall((data, context) => {
  return admin.firestore().collection("usernames").doc(data.username).get().then((doc) => {
    return admin.auth().setCustomUserClaims(doc.uid, {
    admin: true
  }).then(() => {
    return {
      message: `Success! ${data.username} has been made admin`
    }
  }).catch((error) => {
    return error
  })
})
*/
