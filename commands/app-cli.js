require('dotenv').config();
const
    yargs = require('yargs'),
    commandos = require('./commands');

yargs.version('1.0.0')
    .usage('Usage: nodejs-cli-app <command> [options]')
    .help('h')
    .command({
        command: 'set',
        describe: 'Set application state',
        handler(argv) {
            const arg = argv._[1]

            switch (arg) {
                case "prod":
                    commandos.setState("production")
                    commandos.chalkStates.success('APP_MODE=production')
                    break;
                case "dev":
                    commandos.setState("development")
                    commandos.chalkStates.success("APP_MODE=development")
                    break;
                default:
                    commandos.chalkStates.error("Invalid argument, try prod or dev")
            }
        }
    }).command({
        command: 'joke',
        describe: 'Have a little fun :)',
        handler(argv) {
            return commandos.fetchJoke()
        }
    }).command({
        command: "es:purge",
        describe: "Remove documents index from elasticsearch",
        handler(argv) {
            return commandos.elasticPurge()
        }
    }).command({
        command: "rm:uploads",
        describe: "Delete uploads directory",
        handler(argv) {
            return commandos.deleteUploadDirectory()
        }
    })
    .alias('h', 'help').argv