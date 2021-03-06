const Bot = require('./Base/Client');
//Création du client
const client = new Bot({fetchAllMembers: true});
//Fonction pour charger une commande
function loadCommand(commandPath, commandName) {
    try {
        const props = new (require(`${commandPath}${path.sep}${commandName}`))(client);
        console.log(`Loading Command: ${props.help.name}. 👌`);
        props.config.location = commandPath;
        if (props.init) {
            props.init(client);
        }
        client.commands.set(props.help.name, props);
        return false;
    } catch (e) {
        return `Unable to load command ${commandName}: ${e}`;
    }
}

let config = require("./config");

const {promisify} = require("util"),
    fs = require('fs'),
    readdir = promisify(require("fs").readdir),
    path = require('path');
//Déclaration de la fonction init
const init = async () => {

//Command Handler
    fs.readdir("./commands/", (err, content) => {
        if (err) console.log(err);
        if (content.length < 1) return console.log('Please create folder in "commands" folder.');
        let groups = [];
        content.forEach(element => {
            if (!element.includes('.')) groups.push(element); 
        });
        groups.forEach(folder => {
            fs.readdir("./commands/" + folder, (e, files) => {
                let js_files = files.filter(f => f.split(".").pop() === "js");
                if (js_files.length < 1) return console.log('Please create files in "' + folder + '" folder.');
                if (e) console.log(e);
                js_files.forEach(element => {
                    const response = loadCommand('./commands/' + folder, `${element}`);
                    if (response) console.log(response);
                });
            });
        });
    });

//Event Handler
    const evtFiles = await readdir("./events/");
    console.log(`Loading a total of ${evtFiles.length} events.`);
    evtFiles.forEach(file => {
        const eventName = file.split(".")[0];
        console.log(`Loading Event: ${eventName}`);
        const event = new (require(`./events/${file}`))(client);
        client.on(eventName, (...args) => event.run(...args).catch(err => console.log(err)));
        delete require.cache[require.resolve(`./events/${file}`)];
    });
    await client.login(config.token); 

};
//Utilisation de la fonction init
init();

//Log si le bot se deconnecte, reconnecte, a une erreur
client.on("disconnect", () => console.log("Bot is disconnecting..."))
    .on("reconnecting", () => console.log("Bot reconnecting..."))
    .on("error", e => console.log(e))
    .on("warn", info => console.log(info));

//Log si le process renvoi une erreur
process.on("unhandledRejection", err => {
    console.error("Uncaught Promise Error: ", err);
});
//Exportation de la variable client
module.exports = client;
