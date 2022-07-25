import Client from '@/Client';
import reactionRole from '@/database/schemas/roles/reactionRole';
import reactionRoleGroup from '@/database/schemas/roles/reactionRoleGroup';
import { GuildMemberRoleManager, SelectMenuInteraction } from 'discord.js';

export default async (client: Client, interaction: SelectMenuInteraction) => {
	if (!(await reactionRoleGroup.exists({ guild: interaction.guild.id }))) return;
	await interaction.deferUpdate();
	interaction.component.options.forEach(async (o) => {
		if (!(await reactionRole.exists({ id: parseInt(o.value.slice(-6)) }))) return;
		const rRole = await reactionRole.findOne({ id: parseInt(o.value.slice(-6)) });
		if (interaction.values.includes(o.value)) {
			(interaction.member.roles as GuildMemberRoleManager).add(rRole.role, 'Automated Action: Reaction Roles').catch(() => {});
		} else {
			(interaction.member.roles as GuildMemberRoleManager).remove(rRole.role, 'Automated Action: Reaction Roles').catch(() => {});
		}
	});
};
