const jwt = require('jsonwebtoken')

module.exports = function(email, id){
    return jwt.sign({
        email,
        id,
    }, 'secret')
}