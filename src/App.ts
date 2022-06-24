import Client from '@/Client';
import { Intents, Options } from 'discord.js';
import { commandHandler, baseCommandHandler, eventHandler, buttonHandler } from '@/Handlers';
import databaseConnect from '@/database/connect';
import helpers from '@/helpers/index';

export default () => {
	const client: Client = new Client({
		makeCache: Options.cacheWithLimits({
			...Options.defaultMakeCacheSettings,
			MessageManager: 180
		}),
		intents: [
			Intents.FLAGS.GUILDS,
			Intents.FLAGS.DIRECT_MESSAGES,
			Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
			Intents.FLAGS.GUILD_BANS,
			Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
			Intents.FLAGS.GUILD_INVITES,
			Intents.FLAGS.GUILD_MEMBERS,
			Intents.FLAGS.GUILD_MESSAGES,
			Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
			Intents.FLAGS.GUILD_INTEGRATIONS,
			Intents.FLAGS.GUILD_MESSAGE_TYPING,
			Intents.FLAGS.GUILD_PRESENCES,
			Intents.FLAGS.GUILD_WEBHOOKS
		],
		partials: ['CHANNEL', 'GUILD_MEMBER', 'GUILD_SCHEDULED_EVENT', 'MESSAGE', 'REACTION', 'USER'],
		retryLimit: 6
	});
	
	helpers();
	eventHandler(client);
	buttonHandler(client);
	commandHandler(client);
	baseCommandHandler(client);
	databaseConnect();

	client.login(process.env.TOKEN);
};
