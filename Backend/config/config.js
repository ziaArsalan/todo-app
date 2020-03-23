const todoAppKey = require('./todo.app.key.json')

const credentials = {
    firebaseKey: todoAppKey,
    firebaseCredentails: {
        apiKey: "AIzaSyCBBnjn_eHyVwdAP1cUDk-AzeeCPW_WRTk",
        authDomain: "todoapp-5ca43.firebaseapp.com",
        databaseURL: "https://todoapp-5ca43.firebaseio.com",
        projectId: "todoapp-5ca43",
        storageBucket: "todoapp-5ca43.appspot.com",
        messagingSenderId: "796898989071",
        appId: "1:796898989071:web:43a8cbb2c1de92afe7bf7a",
        measurementId: "G-Q6J886QYR4"
    },
    port: 3000,
    log:  'dev'
}

module.exports = credentials