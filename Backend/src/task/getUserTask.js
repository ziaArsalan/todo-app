const getTask = require('./services/getTask')

module.exports = async function(req, res){
    console.log('Get User Task');
    try {
        const user = req.user

        const tasks = await getTask(user.id)

        if(tasks.success){
            return res.status(200).send({
                success: tasks.success,
                message: tasks.message,
                data: tasks.data
            })
        }

        return res.status(400).send({
            success: false,
            message: 'No todo item found.'
        })

    } catch (error) {
        console.log('Get User Task - ERROR', error);
        res.status(400).send({
            success: false,
            message: 'Error getting user tasks.',
            error: error.message
        })
    }    
}