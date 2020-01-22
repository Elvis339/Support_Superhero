require('dotenv').config();
const
    events = require('events').EventEmitter,
    eventEmitter = new events.EventEmitter(),
    axios = require('axios');

let
    intent = null,
    X_Angie_AuthApiToken = null;

const getIntent = async () => {
    const res = await axios.post(process.env.ACTIVECOLLAB_GET_INTENT_URL, {
        email: process.env.ACTIVECOLLAB_MAIL,
        password: process.env.ACTIVECOLLAB_PW
    })
    if (res.data.is_ok === 1) {
        return intent = res.data.user.intent
    }
    throw new Error(res.response)
}

const getAngieAuthApiToken = async () => {
    const res = await axios.post(`${process.env.ACTIVECOLLAB_API_URL}/api/v1/issue-token-intent`, {
        intent,
        client_name: 'support-superhero',
        client_vendor: 'elvis339'
    })
    if (res.data.is_ok) {
        return X_Angie_AuthApiToken = res.data.token
    }
    throw new Error(res.response)
}

const container = async () => {
    try {
        const intent = await getIntent()
        const angie = await getAngieAuthApiToken()
        return {
            intent,
            angie
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    auth_container: async () => {
        try {
            const intent = await getIntent()
            const angie = await getAngieAuthApiToken()
            return {
                intent,
                angie
            }
        } catch (error) {
            console.log(error)
        }
    }
}