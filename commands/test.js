module.exports = {
    name: "test",
    execute: async function(options, message) {

        console.log(options.args)
        message.reply("Все работает!")

    }
}