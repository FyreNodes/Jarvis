import { CommandInfo, CommandRun } from '@/Interfaces';

export const run: CommandRun = async (client, interaction) => {
	const result = Math.floor(Math.random() * 2) + 1;
	let msg: string = null;
	switch (result) {
		case 1:
			msg = 'Heads!';
			break;

		case 2:
			msg = 'Tails!';
			break;
	}
	await interaction.reply({ content: msg });
};

export const info: CommandInfo = {
	name: 'flip',
	category: 'fun',
	description: 'Flip a coin.',
	dm_permission: true
};
