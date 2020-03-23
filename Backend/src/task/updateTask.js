const updateTaskService = require('./services/updateTask')

module.exports = async function(req, res) {
    console.log('Update Task');
    try {
        const user = req.user
        const taskID = req.params.taskID
        const data = req.body

        const result = await updateTaskService(taskID, data)

        if(!result.success){
            return res.status(400).send({
                success: result.success,
                message: result.message
            })
        }

        return res.status(200).send({
            success: true,
            message: 'Task successfully updated.'
        })
        
    } catch (error) {
        console.log('Update Task - ERROR', error);
        res.status(400).send({
            success: false,
            message: 'Unable to update task.',
            error: error.message
        })
    }
}