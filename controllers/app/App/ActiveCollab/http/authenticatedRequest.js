const 
    axios = require('axios'),
    { auth_container } = require('../Authentication');

const authenticatedRequest = async url => {
    try {
        if (!url && typeof url !== 'string') {
            throw new Error(`URL parameter is empty or different than a string.`)
        }
        let token = (await auth_container()).angie
        const res = await axios.get(url, {
            headers: {
                'X-Angie-AuthApiToken': token
            }
        })
        return res.data
    } catch (error) {
        throw new Error(error.stack)
    }
};

module.exports = {
    authenticatedRequest
}