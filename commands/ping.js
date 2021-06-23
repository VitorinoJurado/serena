module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(message, args) {
        return message.channel.send(":ping_pong: Pong! ``Response: Falkenstein, Germany``")
        // You can use this to see if it's properly online.
   },
};