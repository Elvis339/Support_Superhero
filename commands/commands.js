require('dotenv').config(); // Sets up dotenv as soon as our application starts

const
    fs = require('fs'),
    path = require('path'),
    chalk = require('chalk'),
    axios = require('axios'),
    { GET_ROOT_PATH } = require('../utils'),
    rimraf = require('rimraf'),
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
    },

    elasticPurge: async () => {
        try {
            const res = await axios.delete('http://localhost:9200/documents/')
            return chalkStates.success(res.data)
        } catch (error) {
            if (error.response.status === 404) return chalkStates.error('documents index is either deleted or never created')
            return chalkStates.error(error.response)
        }
    },

    deleteUploadDirectory: () => rimraf(path.join(GET_ROOT_PATH('commands'), 'uploads'), error => error ? chalkStates.error(error) : chalkStates.success("Uploads directory removed."))
}