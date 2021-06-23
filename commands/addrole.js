module.exports = {
	name: 'addrole',
	description: 'Adds a role to a user!',
	execute(message, args) {
        message.delete();
        if (message.member.roles.cache.some(r => ["Staff"].includes(r.name))) {
        let member = message.mentions.members.first();
        if (!member) return message.channel.send('That member does not exist.');
        let role = args.slice(1).join(' ');
        role = message.guild.roles.cache.find(r => r.name === role);
        if (!role) return message.channel.send('That role does not exist.');
        try {
        member.roles.add(role);
        message.channel.send(`${message.author.tag} has given ${member} the ${role} role.`);
            } catch (error) {
                console.error(error);
                message.channel.send('An error has occured please check console for more information.');
            }
        }
   },
};