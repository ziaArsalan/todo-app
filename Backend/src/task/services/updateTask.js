const database = require('../../../lib').database
const taskCollection = database.collection('todo-items')
const serverTime = require('../../../lib').serverTime

module.exports = async function(taskID, data){
    return taskCollection.doc(taskID).update({
        ...data,
        updatedAt: serverTime.serverTimestamp()
    }).then(res => {
        return {
            success: true,
            message: 'Task successfully updated.'
        }
    }).catch(err => {
        console.log('Update Task Service - ERROR', err);
        return {
            success: false,
            message: 'Unable to update task.'
        }
    })
}