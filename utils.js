const
    fs = require('fs'),
    path = require('path');

module.exports = {
    GET_ROOT_PATH: dirname => {
        if (typeof dirname !== 'string') {
            return `${dirname} is not string!`
        } else if (!fs.existsSync(dirname)) {
            return `${dirname} directory does not exists!`
        }
        return require.main.filename.split('/').filter(elem => elem !== dirname && elem !== 'app-cli.js').join('/') + '/'
    },
}