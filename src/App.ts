import Client from '@/Client';
import { GatewayIntentBits, Partials, Options, ActivityType } from 'discord.js';
import { commandHandler, baseCommandHandler, eventHandler, buttonHandler } from '@/Handlers';
import databaseConnect from '@/database/connect';
import helpers from '@/helpers/index';

export default () => {
	const client: Client = new Client({
		makeCache: Options.cacheWithLimits({
			...Options.DefaultMakeCacheSettings,
			MessageManager: 180
		}),
		intents: [
			GatewayIntentBits.Guilds,
			GatewayIntentBits.GuildMembers,
			GatewayIntentBits.GuildBans,
			GatewayIntentBits.GuildEmojisAndStickers,
			GatewayIntentBits.GuildIntegrations,
			GatewayIntentBits.GuildInvites,
			GatewayIntentBits.GuildPresences,
			GatewayIntentBits.GuildMessages,
			GatewayIntentBits.GuildMessageReactions,
			GatewayIntentBits.DirectMessages,
			GatewayIntentBits.DirectMessageReactions,
			GatewayIntentBits.MessageContent,
			GatewayIntentBits.GuildScheduledEvents
		],
		partials: [Partials.GuildMember, Partials.User, Partials.Channel, Partials.Message, Partials.Reaction],
		presence: { status: 'online', activities: [{ type: ActivityType.Watching, name: 'over #Fyre' }] }
	});

	helpers(client);
	eventHandler(client);
	buttonHandler(client);
	commandHandler(client);
	baseCommandHandler(client);
	databaseConnect();

	client.login(process.env.TOKEN);
};
