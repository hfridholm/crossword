const functions = require("firebase-functions")
const admin = require("firebase-admin")

exports.makeUserAdmin = functions.https.onCall((data, context) => {
  const { uid } = data

  // Check if the caller has the permission to make someone admin
  if(context.auth.token.admin !== true) {
    throw new functions.https.HttpsError("not-admin", "Only admins can make others admin")
  }

  return admin.auth().setCustomUserClaims(uid, {
    admin: true
  })
  .then(() => {
    return { message: `Success! Made ${uid} an admin` }
  })
  .catch(error => {
    console.log(error)
    throw new functions.https.HttpsError("unknown", error.message, error)
  })
})
