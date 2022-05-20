export interface JarvisConfig {
    guildID: string;
    channels: {
        modLogs: string;
        transcripts: string;
        welcome: string;
    };
    developers: string[];
}

const Config: JarvisConfig = {
    guildID: '961161868968333353',
    channels: {
        modLogs: '968665856919888002',
        transcripts: '974552895489990736',
        welcome: '967944188396183633'
    },
    developers: ['762931157498331157']
};

export default Config;