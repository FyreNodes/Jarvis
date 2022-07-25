import { JarvisConfig } from "@/Interfaces";

const Config: JarvisConfig = {
    guild: '649744489413607426',
    staffGuild: '887059550480515152',
    tickets: '979572692778877018',
    themeColor: 0x1AB6DC,
    roles: {
        admin: '979572665427828826',
        support: '979572666790973440',
        verified: '979572671501185065',
        member: '979572672436518922'
    },
    channels: {
        welcome: '979572698965475338',
        logs: {
            moderation: '981229355407663124',
            transcripts: '981229356443643935'
        }
    },
    presence: {
        status: 'online',
        activity: {
            type: 'PLAYING',
            name: 'Visual Studio Code'
        }
    }
}

export default Config;