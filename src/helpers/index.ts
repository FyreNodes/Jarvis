import transcripts from './transcripts';
import dayjs from './modules/dayjs';
import Client from '@/Client';
import environment from './environment';

export default async (client: Client) => {
	await transcripts();
	environment(client);
	dayjs();
};
