require('dotenv').config(); // Sets up dotenv as soon as our application starts

const
    fs = require('fs'),
    path = require('path'),
    chalk = require('chalk'),
    axios = require('axios'),
    { GET_ROOT_PATH } = require('../utils'),
    log = console.log;

let chalkStates = {
    error: (message) => { log(chalk.inverse.red(message)) },
    success: (message) => { log(chalk.inverse.green(message)) }
}

module.exports = {
    chalkStates,

    setState: command => {
        let 
            root_dir = GET_ROOT_PATH('commands'), 
            _path = path.join(root_dir, 'state')
            
        fs.writeFileSync(_path, command)
        process.env.NODE_ENV = command
        console.log(process.env.NODE_ENV)
    },

    fetchJoke: async () => {
        const API_URL = 'http://api.icndb.com/jokes/random'

        try {
            const response = await axios.get(API_URL)
            return chalkStates.success(response.data.value.joke)
        } catch (error) {
            chalkStates.error(error)
        }
    }
}