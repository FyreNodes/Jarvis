import Client from '@/Client';
import { Attachment, Message } from 'discord.js';
import Tesseract from 'tesseract.js';
import responces from '@/root/responces';

export default async (client: Client, message: Message) => {
	let text = message.content;
	if (message.attachments.size > 0) {
		message.react('👀');
		text = await parseImage(message.attachments.first());
	}
	const index = responces.findIndex((r) => text.match(r.key));
	if (index == -1) return;
	return message.reply({ content: responces[index].value });
};

async function parseImage(image: Attachment): Promise<string> {
	return new Promise<string>(async (resolve, reject) => {
		await Tesseract.recognize(image.url, 'eng').then(async ({ data: { text } }) => resolve(text)).catch(reject); // prettier-ignore
	});
}
