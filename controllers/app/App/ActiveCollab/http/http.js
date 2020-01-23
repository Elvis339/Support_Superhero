const TASK_LIST_IDS = [
    45622,
    42793,
    42800
]

module.exports = {
    getTaskLists: async (req, res) => {
        try {
            const project = req.ActiveCollab
            let task_list = project.task_lists.filter(list => list.id === 45622 || list.id === 42793 || list.id === 42800)
            res.status(200).send(task_list)
        } catch (error) {
            res.status(500).send({
                message: 'Failed to fetch task-lists',
                status: 500,
                error: error.toString()
            })
        }
    },

    getTasks: async (req, res) => {
        try {
            let query = parseInt(req.query.task_list_id);

            for (let _id of TASK_LIST_IDS) {
                if (query !== _id) {
                    throw new Error('Invalid task_list_id.')
                }
                let filtered = req.ActiveCollabTasks.tasks.filter(item => item.task_list_id === query)
                return res.status(200).send(filtered) 
            }
        } catch (error) {
            res.status(500).send({
                message: 'Failed to fetch tasks.',
                error: error.toString(),
                status: 500
            })
        }
    },
}