module.exports = {
    name: "rep",
    execute: async function(options, message) {

        let { mongo, args } = options;
        
        let userID = message.mentions.members.first().user.id;
        let method = args[1];
        let reputation = Number(args[2]);

        if (isNaN(reputation)) return message.reply("Вы не указали какое количество репутации добавить пользователю.");
        if (!userID) return message.reply("Такого пользователя не существует.")

        let db = mongo.db(message.guild.id);
        let usersDB = db.collection("users");

        let userProfile = await usersDB.findOne({ login: userID });
        if (!userProfile) userProfile = {};

        let userReputation = userProfile.reputation || 0;

        if (method === "add") {

            userReputation += reputation;

            message.reply(`Вы успешно начислили себе ${reputation} репутации!`);

        } else if (method === "remove") {

            userReputation -= reputation;

            message.reply(`Вы успешно убрали себе ${reputation} репутации!`);
        } else { 
          message.reply("Вы не указали метод");
        }
 

        if (userProfile.login) {
            usersDB.updateOne(
              {
                login: userID,
              },
              {
                $set: {
                    reputation: userReputation,
                },
              }
            );
          } else {
            usersDB.insertOne({
              login: userID,
              reputation: userReputation,
            });
          }
      
    }
}