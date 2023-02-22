const ytdl = require('ytdl-core');
const { setEmbedMessage } = require('./list');
const playlistDb = require('../../databases/playlist');

module.exports = {
  name: 'add',
  args: true,
  usage: '<youtube url>',
  description: `Add music to Boco's music player`,
  async execute(message, args) {
    const guildId = message.channel.guild.id;
    const youtubeUrl = args[0];
    if(!ytdl.validateURL(youtubeUrl)) { return; }
    await playlistDb.add(guildId, youtubeUrl);
    let embed = await setEmbedMessage(guildId);
    message.channel.send('', { embed });
  },
};
