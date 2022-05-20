import config from "@/database/schemas/config";
import cfg from '@config';

export default async () => {
    if (await config.exists({ guildID: cfg.guildID })) return;
    await config.create({ guildID: cfg.guildID, prefix: '.', status: { type: 'idle', activity: { type: 'PLAYING', name: 'Jarvis Initialized. Awaiting setup.' } } });
};