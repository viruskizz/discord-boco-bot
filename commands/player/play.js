const ytdl = require('ytdl-core');
const { addPlaylist } = require('./add');
const playlistDb = require('../../databases/playlist');

module.exports = {
  name: 'play',
  args: false,
  usage: '<youtube url>',
  description: `Play Boco's music player`,
  async execute(message, args) {
    const youtubeUrl = args[0];
    const guildId = message.channel.guild.id;
    const playlist = await playlistDb.get(guildId);
    if (!youtubeUrl && playlist.list.length === 0) {
      message.reply('Playlist also empty. run `add command or play with url`');
      return;
    }
    if (youtubeUrl && playlist.list.length >= 0) {
      if(!ytdl.validateURL(youtubeUrl)) { return; }
      await addPlaylist(youtubeUrl);
      if (playlist.playing && playlist.list.length > 1) { return; }
    }
    if(!message.member.voice.channelID) { message.reply(`:x: User haven't joined the voice channel`); return; }
    // reset playing state if bot haven't joined
    if (!message.guild.voice || !message.guild.voice.channel || !message.guild.voice.connection) {
      playlist.playing = false;
      await playlistDb.updatePlayState(guildId, false);
    }
    const voiceChannel = message.member.voice.channel;
    voiceChannel.join().then(connection => {
      if (!playlist.playing) {
        this.playMusic(message, connection);
      }
    }).catch(e => console.log('Error: ', e));
  },
  async playMusic(message, connection) {
    const guildId = message.channel.guild.id;
    const playlist = await playlistDb.get(guildId);
    const streamOptions = { seek: 0, volume: 0.8 };
    const stream = ytdl(playlist.list[0].videoUrl, { filter: 'audioonly' });
    connection.play(stream, streamOptions)
      .on('start', () => {
        playlistDb.updatePlayState(guildId, true);
        message.reply(
          'Boko BOT is playing the music :musical_keyboard:\n' +
          playlist.list[0].videoUrl
        );
      })
      .on('finish', () => {
        playlistDb.update(guildId, playlist.list.slice(1));
        if (playlist.list.length === 0) {
        playlistDb.updatePlayState(false);
          message.member.voice.channel.leave();
        } else {
          this.playMusic(message, connection);
        }
      });
  }
};
