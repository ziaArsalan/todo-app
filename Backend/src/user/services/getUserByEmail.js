const database = require('../../../lib').database
const userCollection = database.collection('users')

module.exports = async function(email){
    const user = await userCollection.where('email', '==', email).get()

    if(!user.empty){
        return {
            success: true,
            message: 'User found.',
            data:    {
                ...user.docs[0].data(),
                id: user.docs[0].id
            }
        }
    }

    return {
        success: false,
        message: 'No user found.'
    }
}