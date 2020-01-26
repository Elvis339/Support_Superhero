const auth = require('../../../controllers/ActiveCollab/http/authenticatedRequest');

const bootstrapApiCall = async (req, res, next) => {
    const url = `${process.env.ACTIVECOLLAB_API_URL}/api/v1/projects/${process.env.ACTIVECOLLAB_PROJECT_ID}`
    try {
        let project = await auth.authenticatedRequest(url)
        req.ActiveCollab = project
        next()
    } catch (error) {
        res.status(500).send({
            message: 'Failed to bootstrap API...',
            error: error.toString(),
            status: 500
        })
    }
};

const bootstrapTasksApiCall = async (req, res, next) => {
    const url = `${process.env.ACTIVECOLLAB_API_URL}/api/v1/projects/${process.env.ACTIVECOLLAB_PROJECT_ID}`
    try {
        let tasks = await auth.authenticatedRequest(`${url}/tasks`)
        req.ActiveCollabTasks = tasks
        next()
    } catch (error) {
        res.status(500).send({
            message: 'Failed to bootstrap tasks API...',
            error: error.toString(),
            status: 500
        })
    }
};

module.exports = {
    bootstrapApiCall,
    bootstrapTasksApiCall
}