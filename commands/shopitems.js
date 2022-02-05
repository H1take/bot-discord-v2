const createId = require("create-id");

module.exports = {
    name: "shopitem",
    execute: async function (options, message) {

        let { client, mongo, args } = options;

        let method = args[0];
        let nameItem = args[1];
        let descriptionItem = args[2];
        let priceItem = args[3];
        let shopItemId = createId();
        let ownerShopItem = message.author.username;
        let attachment = message.attachments.first();
        let pictureItem = attachment ? attachment.url : null;


        if (!nameItem) return message.reply("Укажите название товара.");
        if (!descriptionItem) return message.reply("Укажите описание товара.");
        if (isNaN(priceItem)) return message.reply("Укажите цену товара.");

        let db = mongo.db(message.guild.id);
        let shopItemsDB = db.collection("shopItems");

        let shopItem = await shopItemsDB.findOne({ id: shopItemId });
        if (!shopItem) shopItem = {};

        if (method === "add" && shopItemId) {
            shopItemsDB.insertOne({
                name: nameItem,
                description: descriptionItem,
                price: priceItem,
                owner: ownerShopItem,
                picture: pictureItem
            });
        } else if (method === "delete") {
            shopItemsDB.deleteOne(nameItem, ownerShopItem)
        } 
        else if (method === "update") {
            shopItemsDB.updateOne(
            {
                id: shopItemID,
                name: nameItem,
                owner: ownerShopItem
            },
            { 
                $set: {
                    name: nameItem,
                    description: descriptionItem,
                    price: priceItem,
                    owner: ownerShopItem,
                    picture: pictureItem
                }
            })
        } else {
            return message.reply("Вы не указали метод.")
        }
    }
}