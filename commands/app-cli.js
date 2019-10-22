require('dotenv').config();
const
    yargs = require('yargs'),
    commandos = require('./commands')

yargs.version('1.0.0')
    .usage('Usage: nodejs-cli-app <command> [options]')
    .help('h')
    .command({
        command: 'set',
        describe: 'Set application state',
        handler(argv) {
            const arg = argv._[1]
            const path = '../.env'

            switch (arg) {
                case "prod":
                    commandos.setState(path, "APP_MODE=production")
                    commandos.chalkStates.success('APP_MODE=production')
                    break;
                case "dev":
                    commandos.setState(path, "APP_MODE=development")
                    commandos.chalkStates.success('APP_MODE=development')
                    break;
                default:
                    commandos.chalkStates.error("Invalid argument, try prod or dev")
            }
        }
    })
    .command({
        command: "state",
        describe: "Returns in which state the app is currenctly running",
        handler(argv) {
            return commandos.getState()
        }
    })
    .alias('h', 'help').argv
