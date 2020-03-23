const database = require('../../../lib').database
const userCollection = database.collection('users')

module.exports = async function(id){
    const user = await userCollection.doc(id).get()

    if(user.exists){
        return {
            success: true,
            message: 'User found.',
            data:    {
                ...user.data(),
                id: user.id
            }
        }
    }

    return {
        success: false,
        message: 'No user found.'
    }
}