const database = require('../../../lib').database
const serverTime = require('../../../lib').serverTime
const userCollection = database.collection('users')
const getUserByEmail = require('./getUserByEmail')

module.exports = async function(user) {

    const result = await getUserByEmail(user.email)

    if(!result.success){
        const userRef = userCollection.doc()

        await userRef.set({
            ...user,
            createdAt: serverTime.serverTimestamp()
        })

        const userData = await userRef.get()

        if(userData.exists){
            return {
                success: true,
                message: 'User successfully registered.',
                data:    {
                    ...userData.data(),
                    id: userData.id
                }
            }
        }
    }

    return {
        success: false,
        message: 'User already exist.',
        data:    result.data
    }
}