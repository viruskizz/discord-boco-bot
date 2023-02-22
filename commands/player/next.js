const { playMusic } = require('./play');
const playlistDb = require('../../databases/playlist');

module.exports = {
  name: 'next',
  args: false,
  description: `Pause the Boko's music player`,
  async execute(message, args) {
    if(!message.guild.voice) { message.reply(`:x: Bot haven't joined the voice channel use command \`/gg.play <youtube url>\``); return; }
    if(!message.guild.voice.channel) { message.reply(`:x: Bot haven't joined the voice channel use command \`/gg.play <youtube url>\``); return; }
    if(!message.member.voice) { message.reply(`:x: User haven't joined the voice channel`); return; }
    if(message.guild.voice.channelID !== message.member.voice.channelID) { message.reply(`:x: User haven't joined in same the voice channel with Boko Bot`); return;}
    const guildId = message.channel.guild.id;
    const playlist = await playlistDb.get(guildId);
    if (!playlist.playing) { message.reply(`:x: Player is's playing`); return; }
    if (playlist.list.length <= 1) { message.reply(`:x: This is last song`); return; }
    playlist.list = playlist.list.slice(1);
    playlist.playing = false;
    playlistDb.update(guildId, playlist);
    await playMusic(message, message.guild.voice.connection);
  },
};
