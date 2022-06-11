import Client from "@/Client";
import { GuildMember } from "discord.js";

export default async (client: Client, oldMember: GuildMember, newMember: GuildMember) => {
    if (oldMember.pending && !newMember.pending) {
        await newMember.roles.add(client.config.roles.member); 
    };
};