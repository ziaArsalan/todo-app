const database = require('../../../lib').database
const taskCollection = database.collection('todo-items')

module.exports = async function(userID){
    
    let taskData = []

    const tasks = await taskCollection.where('userID', '==', userID).get()

    if(!tasks.empty){
        tasks.forEach(task => {
            taskData.push({
                id: task.id,
                ...task.data()
            })
        })
        return {
            success: true,
            message: 'User todo items successfully found.',
            data: taskData
        }
    }

    return {
        success: false,
        message: 'No todo items found.'
    }
    
}