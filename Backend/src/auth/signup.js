const generatePasswordHash = require('../util/generateHash')
const genereateToken = require('../util/generateToken')
const registerNewUser = require('../user/services/registerNewUser')

module.exports = async function(req, res){
    const {
        firstName,
        lastName,
        email,
        password,
        phone
    } = req.body

    try {
        const hashPass = generatePasswordHash(password)

        const user = await registerNewUser({
            firstName,
            lastName,
            email,
            password: hashPass,
            phone
        })

        // Old user
        if(!user.success){
            const token = genereateToken(user.data.email, user.data.id)
            res.status(400).send({
                success: user.success,
                message: user.message,
                user: {
                    firstName: user.data.firstName,
                    lastName: user.data.lastName,
                    email: user.data.email,
                    phone: user.data.phone,
                    createAt: user.data.createAt.seconds,
                    token
                }
            })
        } else {
            // User registered successfully then generate token
            const token = genereateToken(user.data.email, user.data.id)
            console.log(user.data);
            
            res.status(200).send({
                success: true,
                message: 'User successfully registered.',
                user: {
                    firstName: user.data.firstName,
                    lastName: user.data.lastName,
                    email: user.data.email,
                    phone: user.data.phone,
                    createAt: user.data.createAt.seconds,
                    token
                }
            })
        }

    } catch (error) {
        console.log('Singup - ERROR', error)

        res.status(400).send({
            success: false,
            message: 'Unable to register new user.',
            error:   error.message
        })
    }
}