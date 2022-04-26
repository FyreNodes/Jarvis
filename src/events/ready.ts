import Client from "@/Client";
import config from "@/database/schemas/config";

export default async (client: Client) => {
    const cfg = await config.findOne({ guildID: '961161868968333353' });
    const status = await cfg.get('status');
    client.user.setPresence({ status: 'online', activities: [{ type: status.type, name: status.msg }] });
    console.log('ready');
};