const admin = require("firebase-admin")
const config = require('../../config/config')

const firebaseApp = admin.initializeApp({
    credential: admin.credential.cert(config.firebaseKey),
    databaseURL: config.firebaseCredentails.databaseURL
})

module.exports = firebaseApp
