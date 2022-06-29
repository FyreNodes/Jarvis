import reactionRoleCache from "@/database/schemas/roles/reactionRoleCache";
import { ButtonInfo, ButtonRun } from "@/Interfaces";
import { MessageActionRow, MessageButton } from "discord.js";

export const run: ButtonRun = async (client, interaction) => {
    const continueButton = new MessageButton({ customId: 'btn.rr.group.delete.confirm', label: 'Continue', emoji: '<:tick_yes:990760873519874060>', style: 'SUCCESS', disabled: true });
	const cancelButton = new MessageButton({ customId: 'btn.rr.group.delete.cancel', label: 'Cancel', emoji: '<:tick_no:990760953698222090>', style: 'DANGER', disabled: true });
	const row = new MessageActionRow({ components: [continueButton, cancelButton] });
    await interaction.update({ components: [row] });
    await reactionRoleCache.deleteOne({ guild: interaction.guild.id, channel: interaction.channel.id, int: interaction.message.id });
    await interaction.channel.send({ content: 'Action was cancelled.' });
};

export const info: ButtonInfo = {
    custom_id: 'btn.rr.group.delete.cancel',
    category: 'reactionroles'
};