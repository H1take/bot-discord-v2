module.exports = {
    name: "kick",
    execute: async function(options, message) { 
        
        let user = message.mentions.members.first();
        
        if (user) {
            if (user.position >= message.guild.me.roles.highest.position) {
                return message.reply(
                  "У вас недостаточно прав, чтобы кикнуть этого пользователя"
                );
            } else {
                user.kick();
            }
            } else {
              return message.reply("Такого пользователя не существует!");
            }
    }
}