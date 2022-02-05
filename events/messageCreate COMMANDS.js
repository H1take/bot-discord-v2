const { prefix } = require("../config/config.json");

module.exports = async function (options, message) {
    
  if (message.channel.type != "GUILD_TEXT") return;
  if (message.author.bot) return;

  if (!message.content.startsWith(prefix)) return;

  let args = message.content.split(/\s+/);

  let commandName = args[0].replace(prefix, "");

  args.splice(0, 1);

  let commandsList = Bot.commands;

  let command = commandsList.filter((command) => command.name === commandName.toLowerCase()).first();

  if (!command) return;

  options.args = args;

  command.execute(options, message);
};
