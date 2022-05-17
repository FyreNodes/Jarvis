export interface JarvisConfig {
    guildID: string;
    channels: {
        modLogs: string;
        transcripts: string;
    };
}

const Config: JarvisConfig = {
    guildID: '961161868968333353',
    channels: {
        modLogs: '968665856919888002',
        transcripts: '974552895489990736'
    }
};

export default Config;