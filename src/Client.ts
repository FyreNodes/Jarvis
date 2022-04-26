import { Client as DiscordClient, Collection } from 'discord.js';
import { BasicCommand, ApplicationCommand } from '@/Interfaces';
import { applicationCommandHandler, basicCommandHandler, eventHandler } from '@/Handlers';

export default class Client extends DiscordClient
{
    public basicCommands: Collection<string, BasicCommand> = new Collection();
    public applicationCommands: Collection<string, ApplicationCommand> = new Collection();

    public init() {
        eventHandler(this);
        basicCommandHandler(this);
        applicationCommandHandler(this);
        this.login(process.env.TOKEN);
    };
};