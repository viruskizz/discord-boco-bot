const fs = require('fs/promises');
const ytdl = require('ytdl-core');
const {selectedVideoInfo} = require('../utils/transform.util');

module.exports = {
  playing: false,
  list: [],
  getFilename(guildId) {
    return `databases/${guildId}_playlist.json`;
  },
  async updatePlayState(guildId, state) {
    return this.get(guildId)
    .then(playlist => {
      playlist.playing = state;
      return this.update(guildId, playlist);
    })
  },
  async get(guildId) {
    const filename = this.getFilename(guildId);
    return fs.access(filename)
      .then( _ => fs.readFile(filename))
      .then(d => JSON.parse(d))
      .catch(e => {
        console.log(e);
        return {playing: false, list: []}
      })
  },
  async add(guildId, youtubeUrl) {
    let info = await ytdl.getBasicInfo(youtubeUrl)
      .then(({videoDetails}) => selectedVideoInfo(videoDetails));
    return this.get(guildId)
    .then(playlist => {
      playlist.list.push(info);
      return this.update(guildId, playlist);
    })
  },
  async update(guildId, playlist) {
    return fs.writeFile(
      this.getFilename(guildId),
      JSON.stringify(playlist, null, 2),
      'UTF8'
    )
  }
}
