const firebaseApp = require('./firebase/firebase')
const database = require('./firebase/database')
const serverTime = require('./firebase/serverTime')

module.exports = {
    firebaseApp,
    database,
    serverTime
}