const generateHash = require('../util/generateHash')
const generateToken = require('../util/generateToken')
const getUserByEmail = require('../user/services/getUserByEmail')

module.exports = async function(req, res){
    const {
        username,
        password
    } = req.body

    try {
        const passHash = generateHash(password)
    
        const user = await getUserByEmail(username)
    
        // No user found
        if(!user.success){
            res.status(400).send({
                success: false,
                message: 'Invalid username.'
            })
        }
    
        if(user.success){

            // User found then check password
            if(user.data.password !== passHash){
                res.status(400).send({
                    success: false,
                    message: 'Invlaid password.'
                })
            }
        
            // User found and valid password
            if(user.success && user.data.password === passHash){
                const token = generateToken(user.data.email, user.data.id)
                res.status(200).send({
                    success: true,
                    message: 'Login successfully.',
                    user: {
                        firstName: user.data.firstName,
                        lastName: user.data.lastName,
                        email: user.data.email,
                        phone: user.data.phone,
                        createdAt: user.data.createdAt.seconds,
                        token
                    }
                })
            }
            
        }
    } catch (error) {
        console.log('Login - ERROR', error);

        res.status(400).send({
            success: false,
            message: 'User loging error.',
            error:   error.message
        })       
    }

}