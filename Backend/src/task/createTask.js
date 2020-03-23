const database = require('../../lib').database
const taskCollection = database.collection('todo-items')
const serverTime = require('../../lib').serverTime


module.exports = async function(req, res){
    console.log('Create Task');
    try {
        const task = req.body.task
        const user = req.user
    
        const taskRef = taskCollection.doc()

        await taskRef.set({
            userID: user.id,
            taskTodo: task,
            createdAt: serverTime.serverTimestamp(),
            isDelete: false,
            isComplete: false
        })

        res.status(200).send({
            success: true,
            message: 'Task successfully created.'
        })

    } catch (error) {
        console.log('Create Task - ERROR', error);
        res.status(400).send({
            success: false,
            message: 'Unable to create new task.',
            error: error.message
        })
    }
}