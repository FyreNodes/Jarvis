import reactionRole from "@/database/schemas/roles/reactionRole";
import reactionRoleCache from "@/database/schemas/roles/reactionRoleCache";
import reactionRoleGroup from "@/database/schemas/roles/reactionRoleGroup";
import { ButtonInfo, ButtonRun } from "@/Interfaces";
import { MessageActionRow, MessageButton } from "discord.js";

export const run: ButtonRun = async (client, interaction) => {
    const int = await reactionRoleCache.findOne({ guild: interaction.guild.id, channel: interaction.channel.id, int: interaction.message.id });
    const continueButton = new MessageButton({ customId: 'btn.rr.group.delete.confirm', label: 'Continue', emoji: '<:tick_yes:990760873519874060>', style: 'SUCCESS', disabled: true });
	const cancelButton = new MessageButton({ customId: 'btn.rr.group.delete.cancel', label: 'Cancel', emoji: '<:tick_no:990760953698222090>', style: 'DANGER', disabled: true });
	const row = new MessageActionRow({ components: [continueButton, cancelButton] });
    await interaction.update({ components: [row] });
    await reactionRole.deleteMany({ group: int.data, guild: interaction.guild.id });
	await reactionRoleGroup.deleteOne({ id: int.data, guild: interaction.guild.id });
    await reactionRoleCache.deleteOne({ guild: interaction.guild.id, channel: interaction.channel.id, int: interaction.message.id });
	await interaction.channel.send({ content: 'Successfully deleted group.' });
};

export const info: ButtonInfo = {
    custom_id: 'btn.rr.group.delete.confirm',
    category: 'reactionroles'
};