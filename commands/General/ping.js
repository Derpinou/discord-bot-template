const Command = require("../../Base/Command.js");



module.exports = class Ping extends Command {
    constructor (client) {
        super(client, {
            name: "ping",
            description: "Pong",
            permission: [],
            owner: false,
        });
    }
    async run (message, args) {
        message.reply("Pong")
    }
}


