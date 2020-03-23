const crypto = require('crypto')
const salt = '1f5611f9d1a6098cd556e092b15cde7c'

module.exports = function (password){
    return crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex')
}
