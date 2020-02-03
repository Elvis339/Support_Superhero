let 
    EventEmitter = require('events').EventEmitter, 
    myEmitter = new EventEmitter();

[
    'SlackWebhook',
    'CrispWebhook',
    'HelpScoutWebhook'
].map((value, cb) => {
    return myEmitter.on(value, cb => cb)
})

exports.myEmitter = myEmitter