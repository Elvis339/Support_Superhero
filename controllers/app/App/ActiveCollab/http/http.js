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


module.exports = {
    getProjects: async () => {
        const url = `${process.env.ACTIVECOLLAB_API_URL}/api/v1/projects/${process.env.ACTIVECOLLAB_PROJECT_ID}`
        try {
            const projects = await auth_Get(url)
            console.log(projects)
        } catch (error) {
            console.log(error)   
        }
    }
}