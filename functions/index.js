const functions = require("firebase-functions")
const admin = require("firebase-admin")

const serviceAccount = require("../service-account.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

exports.addAdminRole = functions.https.onCall((data, context) => {
  // Check if the caller has the permission to make someone admin
  if(context.auth.token.admin !== true) {
    return {
      error: "Only admins can add other admins"
    }
  }

  return admin.firestore().collection("usernames").doc(data.username).get().then((docSnap) => {
    if(!docSnap.exists) {
      return {
        error: `Username doc for ${data.username} does not exist`
      }
    }

    const docData = docSnap.data()

    return admin.auth().setCustomUserClaims(docData.uid, {
      admin: true
    })
  }).then(() => {
    return {
      message: `Success! Made ${data.username} an admin`
    }
  }).catch((error) => {
    return error
  })
})
