import { JarvisConfig } from "@/Interfaces";

const Config: JarvisConfig = {
    guild: '649744489413607426',
    staffGuild: '887059550480515152',
    tickets: '979572692778877018',
    perms: [
        {
            id: '762931157498331157',
            level: 9
        }
    ],
    roles: {
        admin: '979572665427828826',
        support: '979572666790973440'
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