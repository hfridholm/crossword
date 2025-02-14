const functions = require("firebase-functions")
const admin = require("firebase-admin")

exports.followUser = functions.https.onCall((data, context) => {
  const { uid } = data

  if(!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "Only users can follow other users")
  }

  const callerUid = context.auth.uid 

  return admin.firestore().collection("users").doc(uid).get()
  .then(doc => {
    if(!doc.exists) {
      throw new functions.https.HttpsError("not-found", "User not found")
    }
    // Add callerUid to the list "followers" in doc, if it not already is added
    return doc.ref.update({
      followers: admin.firestore.FieldValue.arrayUnion(callerUid)
    })
  })
  .then(() => {
    // Add username to the list "following" in the caller's doc
    return admin.firestore().collection("users").doc(callerUid).update({
      following: admin.firestore.FieldValue.arrayUnion(uid)
    })
  })
  .then(() => {
    return { message: `Success! Now following ${uid}` }
  })
  .catch(error => {
    console.log(error)
    throw new functions.https.HttpsError("unknown", error.message, error)
  })
})
