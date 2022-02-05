module.exports = {
    name: "clear",
    execute: async function(options, message) {

        let countMessages = Number(options.args[0]); // NaN

        if (!countMessages) countMessages = 1;

        if (isNaN(countMessages)) {
        return message.channel.send("Это не число!");
        }

        if (countMessages > 100) {
        return message.channel.send(
            "Вы не можете удалить за раз больше 100 сообщений!"
        );
        }

        if (countMessages <= 0) {
        return message.channel.send(
            "Вы не можете ввести число равное 0 или меньше 0"
        );
        }

        message.channel.bulkDelete(countMessages);
        message.channel.send(`Удалено ${countMessages} сообщений!`);
    }
}