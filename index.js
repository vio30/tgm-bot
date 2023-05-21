const TelegramBot = require('node-telegram-bot-api');

const token = '1116686217:AAFFhVbxAAg0s0n0i858heFhSXQDTey38iI';

const bot = new TelegramBot(token, {polling: true});


const visaOptions = {
    reply_markup: JSON.stringify({
    inline_keyboard:
        [[{text: 'yes', callback_data: 'yes'},{text: 'no', callback_data: 'no'}]]
})
}
const start = () => {
    bot.setMyCommands ([
        {command: '/start', description: "Initial greeting"},
        {command: '/info', description: 'Your name info'},
        {command: '/question', description: 'additional info'}
    ])

    bot.on('message', async (msg) => {
        const text = msg.text;
        const chatId = msg.chat.id;
        console.log(msg);
        if (text === '/start') {
            return bot.sendMessage(chatId, 'Happy to see you here! What are you doing?')
        }
        if (text === '/info') {
            return bot.sendMessage(chatId, `Your name is ${msg.from.first_name} stupid bastard`)
        }
        if (text === '/question' ) {
            return bot.sendMessage (chatId, 'Are you going to buy a holiday tour for your family?', visaOptions)

        }
        return bot.sendMessage (chatId,'I do not understand, try again')
    })

}
bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;
    if (query.data === 'yes') { // если da
        bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/ef9/1b1/ef91b199-ff6b-4f0a-9e17-9303e3e84ee4/7.webp')
    }
    else {
        bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/dc7/a36/dc7a3659-1457-4506-9294-0d28f529bb0a/4.webp')
    }
});

start()

