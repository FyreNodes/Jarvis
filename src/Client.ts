import { Client as DiscordClient, Collection } from 'discord.js';
import { BasicCommand, ApplicationCommand } from '@/Interfaces';
import { applicationCommandHandler, basicCommandHandler, eventHandler } from '@/Handlers';
import connect from './database/connect';

export default class Client extends DiscordClient
{
    public basicCommands: Collection<string, BasicCommand> = new Collection();
    public applicationCommands: Collection<string, ApplicationCommand> = new Collection();

    public init() {
        eventHandler(this);
        basicCommandHandler(this);
        applicationCommandHandler(this);
        connect();
        this.login(process.env.TOKEN);
    };
};