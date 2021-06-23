module.exports = {
	name: 'mute',
	description: 'Mutes a mentioned user!',
	execute(message, args) {
        let time;
        let member;
        let milliseconds;

            message.delete();
            if (message.member.roles.cache.some(r => ("Staff").includes(r.name))) {
                time = args.slice(1).join(' ');
                member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
                if (!member) return;
                if (!time) time = 5;
                milliseconds = time * 60000;
                message.channel.send({
                    embed: {
                        color: 0xff0000,
                        description: `${member} has been muted for ${time} minutes.`
                    }
                });
                timer(milliseconds);
            }
        
    
        function timer() {
            member.roles.add('689185469741006848');
            setTimeout(function () {
                member.roles.remove('689185469741006848');
                message.channel.send({
                    embed: {
                        color: 0x23dc2d,
                        description: `${member} has been unmuted.`
                    }
                });
            }, milliseconds);
        }
   },
};