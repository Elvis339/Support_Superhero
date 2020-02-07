let 
    EventEmitter = require('events').EventEmitter, 
    myEmitter = new EventEmitter();

[
    'App',
    'SlackWebhook',
    'CrispWebhook',
    'HelpScoutWebhook'
].map((value, cb) => {
    return myEmitter.on(value, cb => cb)
})

exports.myEmitter = myEmitter