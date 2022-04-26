import Client from "@/Client";
import { CommandInteraction } from "discord.js";

export interface ApplicationCommand {
    info: ApplicationCommandInfo;
    run: ApplicationCommandRun;
};

export interface ApplicationCommandRun {
    (client: Client, interaction: CommandInteraction);
};

export interface ApplicationCommandInfo {
    name: string;
    description: string;
    category: string;
    type?: number;
    options?: {
        type?: number;
        name: string;
        description: string;
        required?: boolean;
        choices?: string[];
        autocomplete?: boolean;
    };
    default_permission?: boolean;
};