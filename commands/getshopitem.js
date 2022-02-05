const Discord = require("discord.js");

module.exports = {
    name: "getshopitem",
    execute: async function(options, message) {

        let { client, mongo, args } = options;

        let db = mongo.db(message.guild.id);
        let shopItemsDB = db.collection("shopItems");

        let nameItem = args[0];

        if (!nameItem) return message.reply("Вы не указали название товара");

        let shopItem = await shopItemsDB.findOne({ name: nameItem });
        
        // let item = new Discord.MessageEmbed()
        // .setColor("BLURPLE")
        // .setTitle(shopItem.name)
        // .setThumbnail(shopItem.picture)
        // .addField(`Описание: ${shopItem.description}`)
        // .addField(`Цена: ${shopItem.price}`)
        // .addField(`Продавец: ${shopItem.owner.name}`)

        message.channel.send(`Название товара: ${shopItem.name} Описание: ${shopItem.description} Цена: ${shopItem.price} Продавец: ${shopItem.owner} ${shopItem.picture}`);
    }
}
