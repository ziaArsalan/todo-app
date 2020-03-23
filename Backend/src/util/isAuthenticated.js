const decodeToken = require('./decodeToken')
const getUserById = require('../user/services/getUserById')

module.exports = async function(req, res, next){
    const token = req.headers['auth-token']

    if(!token){
        return res.status(401).send({ error: 'Unauthorised' })
    }

    const tokenData = decodeToken(token, 'secret')

    if(!tokenData.success){
        return res.status(401).send({ error: 'Invalid token' })
    }

    const user = await getUserById(tokenData.id)

    if(!user.success){
        return res.status(401).send({ error: 'Invalid token' })
    }

    req.user = user.data
    next()
}