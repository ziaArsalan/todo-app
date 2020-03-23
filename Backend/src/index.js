const AuthRoute = require('./auth/routes')
const TaskRoute = require('./task/routes')

const initializeEnfpoints = (app) => {
    app.use('/api/', AuthRoute)
    app.use('/api/task', TaskRoute)
}

module.exports = initializeEnfpoints