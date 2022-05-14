import { existsSync, mkdirSync } from 'fs';

export default async () => {
	if (existsSync('./transcripts')) return;
	await mkdirSync('./transcripts');
};
