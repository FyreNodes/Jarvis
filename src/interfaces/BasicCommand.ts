import Client from "@/Client";
import { Message, PermissionFlags, PermissionResolvable, Permissions } from "discord.js";

export interface BasicCommand {
    info: BasicCommandInfo;
    run: BasicCommandRun;
};

export interface BasicCommandRun {
    (client: Client, message: Message, args: string[]);
};

export interface BasicCommandInfo {
    name: string;
    category: string;
    permissions?: PermissionResolvable[];
};