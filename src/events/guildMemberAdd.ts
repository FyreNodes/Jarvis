import { AttachmentBuilder, GuildMember, TextChannel } from 'discord.js';
import { createCanvas, loadImage } from 'canvas';
import Client from '@/Client';

export default async (client: Client, member: GuildMember) => {
	if (member.guild.id !== client.config.guild) return;
	const background = await loadImage('./src/assets/welcome.png');
	const avatar = await loadImage(member.user.avatarURL({ size: 256, forceStatic: true }));
	const canvas = createCanvas(1456, 520);
	const ctx = canvas.getContext('2d');

	ctx.drawImage(background, 0, 0);
	ctx.fillStyle = 'rgba(0,0,0,0.5)';
	ctx.fillRect(38, 38, canvas.width - 2 * 38, canvas.height - 2 * 38);
	ctx.save();

	ctx.beginPath();
	ctx.arc(canvas.width / 2, 60 + avatar.height / 2, avatar.width / 2, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();
	ctx.drawImage(avatar, canvas.width / 2 - avatar.width / 2, 60);
	ctx.restore();

	ctx.fillStyle = 'white';
	ctx.textAlign = 'center';

	ctx.font = '68px Sans';
	ctx.fillText(`Welcome ${member.user.username} to FyreNodes!`, canvas.width / 2, avatar.height + 136);

	ctx.font = '40px Sans';
	ctx.fillText(`Member #${member.guild.memberCount}. Please make sure to read the rules.`, canvas.width / 2, avatar.height + 196);

	const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'welcome-card.png' });
	(client.channels.cache.get(client.config.channels.welcome) as TextChannel).send({ content: `Welcome <@!${member.user.id}>,`, files: [attachment] });
};
