const AuthRoute = require('./auth/routes')

const initializeEnfpoints = (app) => {
    app.use('/api/', AuthRoute)
}

module.exports = initializeEnfpoints