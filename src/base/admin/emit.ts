import { BaseCommandInfo, BaseCommandRun } from '@/Interfaces';

export const run: BaseCommandRun = async (client, message, args) => {
	client.emit('guildMemberAdd', message.member);
};

export const info: BaseCommandInfo = {
	name: 'emit',
	category: 'admin',
	permissions: ['Administrator'],
	guildLock: 'main'
};
