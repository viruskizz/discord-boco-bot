const playlistDb = require('../../databases/playlist');

module.exports = {
  name: 'clear',
  args: false,
  description: `Add music to Boco's music player`,
  async execute(message) {
    const guildId = message.channel.guild.id;
    const playlist = await playlistDb.get(guildId);
    if (playlist.playing) {
      await playlistDb.update(guildId, {...playlist, list: playlist.list.slice(1)});
    } else {
      await playlistDb.update(guildId, {...playlist, list: []});
    }
    if(!message.guild.voice || !message.guild.voice.channel) {
      await playlistDb.updatePlayState(guildId, false);
    }
    message.reply(`:page_with_curl: Boco's Playlist has been clear`);
  },
};
