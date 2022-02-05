module.exports = {
    name: "getrole",
    execute: async function(options, message) {

        let role = options.args[0];

        let roleObj = 
            message.guild.roles.cache.get(role) ||
            message.guild.roles.cache.find(guildRole => guildRole.name === role);

            if (roleObj) {
                if (roleObj.position >= message.guild.me.roles.highest.position)
                    return message.reply("У меня недостаточно прав!");
                
                if (!message.member.permissions.has("ADMINISTRATOR"))
                    return message.reply("У вас недостаточно прав!");
                
                    message.member.roles.add(roleObj);
             } else {
                message.channel.send("Такой роли нет!");
            }
    }
}