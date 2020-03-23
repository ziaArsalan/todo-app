const jwt = require('jsonwebtoken')

// Abstract Data From Token
module.exports = function decodeJWT(token, key){
    return jwt.verify(token, key, function (err, decoded){
        if(err){
            return  {
                success: false,
                error:   err.message
            }
        }
        return {
            success: true,
            ...decoded
        }
    })
}