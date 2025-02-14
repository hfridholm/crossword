const functions = require("firebase-functions")
const admin = require("firebase-admin")

const serviceAccount = require("../service-account.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

// Import functions from other files
const { createUser } = require("./createUser.js")
const { deleteUser } = require("./deleteUser.js")

const { followUser } = require("./followUser.js")
const { unfollowUser } = require("./unfollowUser.js")

const { makeUserAdmin } = require("./makeUserAdmin.js")

// Export functions
exports.createUser = createUser
exports.deleteUser = deleteUser

exports.followUser = followUser
exports.unfollowUser = unfollowUser

exports.makeUserAdmin = makeUserAdmin
