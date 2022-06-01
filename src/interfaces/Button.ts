import Client from "@/Client";
import { ButtonInteraction, EmojiIdentifierResolvable, MessageButtonStyle } from "discord.js";

export interface Button {
    run: ButtonRun;
    info: ButtonInfo;
}

export interface ButtonRun {
    (client: Client, interaction: ButtonInteraction);
}

export interface ButtonInfo {
    custom_id: string;
}