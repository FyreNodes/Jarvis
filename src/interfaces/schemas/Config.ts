export interface ConfigInterface {
    guildID: string;
    prefix: string;
    status: {
        type: string;
        msg: string;
        url?: string;
    };
};