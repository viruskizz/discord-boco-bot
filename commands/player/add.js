const ytdl = require('ytdl-core');
const {selectedVideoInfo} = require('../../utils/transform.util');
const { setEmbedMessage } = require('./list');
const {playlist} = global;

module.exports = {
  name: 'add',
  args: true,
  usage: '<youtube url>',
  description: `Add music to Boco's music player`,
  async execute(message, args) {
    const youtubeUrl = args[0];
    if(!ytdl.validateURL(youtubeUrl)) { return; }
    await this.addPlaylist(youtubeUrl);
    let embed = setEmbedMessage();
    message.channel.send('', { embed });
  },
  async addPlaylist(youtubeUrl) {
    let info = await ytdl.getBasicInfo(youtubeUrl)
      .then(({videoDetails}) => selectedVideoInfo(videoDetails));
    playlist.list.push(info);
  }
};
