import { Client as DiscordClient, Collection } from 'discord.js';
import { Command, SlashCommand } from '@/Interfaces';
import { commandHandler, slashCommandHandler, eventHandler } from '@/Handlers';
import connect from '@/database/connect';

export default class Client extends DiscordClient
{
    public commands: Collection<string, Command> = new Collection();
    public slashCommands: Collection<string, SlashCommand> = new Collection();

    public init() {
        eventHandler(this);
        commandHandler(this);
        slashCommandHandler(this);
        connect();
        this.login(process.env.TOKEN);
    };
};