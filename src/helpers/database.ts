import config from "@/database/schemas/config";

export default async () => {
    if (await config.exists({ guildID: '961161868968333353' })) return;
    await config.create({ guildID: '961161868968333353', botID: '805565109992685580', prefix: '.', status: { type: 'idle', activity: { type: 'PLAYING', name: 'Jarvis Initialized. Awaiting setup.' } } });
};