const Discord = require("discord.js");
const config = require("./config/config");
const { token } = require("./config/constants");
const { promisify } = require("util");
const { MongoClient } = require("mongodb");
const { readdirSync } = require("fs");

const client = new Discord.Client({
  intents: [Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILDS],
});

const connectMongo = promisify(MongoClient.connect);

class Bot_v2 {

    constructor() {

        this.commands = new Discord.Collection();
        this.mongo;

        this.client = client;

        this.start();
    }

    async start() {

        await this.loadMongo();

        await this.loadCommands();
        
        await this.loadEvents();     

        await this.login();
    }

    async loadCommands() {
        let commandFiles = await readdirSync("./commands");

        for ( let commandFile of commandFiles) {

            if (!commandFile.endsWith(".js")) continue;

            try {

                let command = require(`./commands/${commandFile}`);

                this.commands.set(command.name, command);

            } catch(error) {
                console.log(`Ошибка при обработке команды: ${commandFile}`);
                console.log(error);
            }
        }
    }

    async loadEvents() {
        
        let eventFiles = await readdirSync("./events");

        const options = {
            client: this.client,
            mongo: this.mongo
        }

        for ( let eventFile of eventFiles) {

            if (!eventFile.endsWith(".js")) continue;

            try {

                let event = require(`./events/${eventFile}`);

                let eventName = eventFile.split(" ")[0].replace(".js", "");

                this.client.on(eventName, event.bind(null, options));

            } catch(error) {
                console.log(`Ошибка при обработке команды: ${commandFile}`);
                console.log(error);
            }
        }
    }

    async loadMongo() {
        try {
            this.mongo = await connectMongo("mongodb://localhost:27017");
      
            console.log(`Успешно подключен к базе данных: localhost:27017`);
        } catch (err) {
            console.log("Ошибка при загрузке базы данных");
            console.log(err);
          }
    }

    async login() {
        await this.client.login(token);
    }
}

global.Bot = new Bot_v2();
