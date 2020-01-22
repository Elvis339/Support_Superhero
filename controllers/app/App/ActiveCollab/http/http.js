const 
    axios = require('axios'),
    { auth_container } = require('../Authentication');

const auth_Get = async url => {
    try {
        if (!url && typeof url !== 'string') {
            throw new Error(`${url} has errors`)
        }
        let token = (await auth_container()).angie
        const res = await axios.get(url, {
            headers: {
                'X-Angie-AuthApiToken': token
            }
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
};

const bootstrapApiCall = async (req, res) => {
    const url = `${process.env.ACTIVECOLLAB_API_URL}/api/v1/projects/${process.env.ACTIVECOLLAB_PROJECT_ID}`
    try {
        return await auth_Get(url)
    } catch (error) {
        res.status(500).send({
            message: 'Failed to bootstrap api calls',
            status: 500,
            message: error.toString()
        })
    }
};


module.exports = {
    getTaskLists: async (req, res) => {
        try {
            const project = await bootstrapApiCall(req, res)
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
}