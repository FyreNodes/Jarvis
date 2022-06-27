const permissions: Permissions = {
    createInvite: Number(1 << 0),
    kickMembers: Number(1 << 1),
    banMembers: Number(1 << 2),
    administrator: Number(1 << 3),
    manageChannels: Number(1 << 4),
    manageGuild: Number(1 << 5),
    addReactions: Number(1 << 6),
    viewAuditLog: Number(1 << 7),
    prioritySpeaker: Number(1 << 8),
    stream: Number(1 << 9),
    viewChannel: Number(1 << 10),
    sendMessages: Number(1 << 11),
    sendTtsMessages: Number(1 << 12),
    manageMessages: Number(1 << 13),
    embedLinks: Number(1 << 14),
    attachFiles: Number(1 << 15),
    readMessageHistory: Number(1 << 16),
    mentionEveryone: Number(1 << 17),
    externalEmojis: Number(1 << 18),
    viewInsights: Number(1 << 19),
    connect: Number(1 << 20),
    speak: Number(1 << 21),
    muteMembers: Number(1 << 22),
    deafenMembers: Number(1 << 23),
    moveMembers: Number(1 << 24),
    useVad: Number(1 << 25),
    changeNickname: Number(1 << 26),
    manageNicknames: Number(1 << 27),
    manageRoles: Number(1 << 28),
    manageWebhooks: Number(1 << 29),
    manageEmojis: Number(1 << 30),
    useCommands: Number(1 << 31),
    requestSpeak: Number(1 << 32),
    manageEvents: Number(1 << 33),
    manageThreads: Number(1 << 34),
    createPublicThreads: Number(1 << 35),
    createPrivateThreads: Number(1 << 36),
    useStickers: Number(1 << 37),
    sendMessageThreads: Number(1 << 38),
    useActivities: Number(1 << 39),
    moderateMembers: Number(1 << 40)
};

export interface Permissions {
    speak: number;
    stream: number;
    useVad: number;
    connect: number;
    embedLinks: number;
    banMembers: number;
    kickMembers: number;
    attachFiles: number;
    manageGuild: number;
    viewChannel: number;
    muteMembers: number;
    moveMembers: number;
    manageRoles: number;
    useCommands: number;
    useStickers: number;
    manageEmojis: number;
    addReactions: number;
    viewAuditLog: number;
    createInvite: number;
    sendMessages: number;
    viewInsights: number;
    requestSpeak: number;
    manageEvents: number;
    useActivities: number;
    manageThreads: number;
    deafenMembers: number;
    administrator: number;
    manageMessages: number;
    manageChannels: number;
    externalEmojis: number;
    changeNickname: number;
    manageWebhooks: number;
    prioritySpeaker: number;
    sendTtsMessages: number;
    mentionEveryone: number;
    manageNicknames: number;
    moderateMembers: number;
    readMessageHistory: number;
    sendMessageThreads: number;
    createPublicThreads: number;
    createPrivateThreads: number;
};

export default permissions;