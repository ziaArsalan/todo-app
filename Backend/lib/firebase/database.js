const firebase = require("firebase-admin")

const database = firebase.firestore()
database.settings({ timestampsInSnapshots: true })

module.exports = database