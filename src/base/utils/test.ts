import { BaseCommandInfo, BaseCommandRun } from '@/Interfaces';
import { MessageActionRow, Modal, TextInputComponent } from 'discord.js';

export const run: BaseCommandRun = async (client, message, args) => {
	
};

export const info: BaseCommandInfo = {
	name: 'test',
	category: 'test'
};
