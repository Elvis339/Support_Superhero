require('dotenv').config(); // Sets up dotenv as soon as our application starts

const
    fs = require('fs'),
    chalk = require('chalk'),
    log = console.log

let chalkStates = {
    error: (message) => { log(chalk.inverse.red(message)) },
    success: (message) => { log(chalk.inverse.green(message)) }
}

module.exports = {
    chalkStates,

    setState: (path, command) => {
        let fd;

        let files = fs.readFileSync(path, { encoding: 'utf-8' })
        let filteredFile = files.split('\n').filter(val => val.indexOf("APP_MODE=production") != -1 || val.indexOf("APP_MODE=development") != -1)

        // If array is empty that means there is no app_mode set => proceed to write
        if (filteredFile.length < 1) {
            try {
                fd = fs.openSync(path, 'a');
                fs.appendFileSync(fd, `\n${command}`, 'utf8');
            } catch (err) {
                throw new Error(err)
            } finally {
                if (fd !== undefined) {
                    fs.closeSync(fd);
                }
            }
        } else { // Means there is app_mode set, in order to remove duplicates
            let elementAtIndex = files.split('\n')[3] // Target element with index 3
            elementAtIndex = command // Set value of that element to the command 
            let elementWithoutIndex = files.split('\n').splice(0, 3).join('\n') // Get original array without element at index 3
            let data = elementWithoutIndex + "\n" + elementAtIndex // join them togeather
            fs.writeFileSync(path, data, { encoding: 'utf-8' }) // write it down
        }
    },
}