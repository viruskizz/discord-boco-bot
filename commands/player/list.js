const {convertSecondToString} = require('../../utils/transform.util');
const playlistDb = require('../../databases/playlist');

module.exports = {
  name: 'list',
  description: `list Boco's Music Playlist`,
  async execute(message, args) {
    const guildId = message.channel.guild.id;
    let embed = await this.setEmbedMessage(guildId);
    message.channel.send('', { embed });
  },
  async setEmbedMessage(guildId) {
    let embed = {
      type: 'rich',
      color: '#f9f504',
      title: `Boco's Music Playlist`,
    };
    const playlist = await playlistDb.get(guildId);
    const list = playlist.list.length > 25 ? playlist.list.slice(0, 25) : playlist.list;
    if (playlist.playing) {
      const playing = list[0];
      embed = {
        ...embed,
        description: `${playing.title} (${convertSecondToString(playing.time)})`,
        thumbnail: {
          url: playing.thumbnails[0].url,
        },
        url: playing.videoUrl,
        fields: setMessageFields(list.slice(1)),
      }
    } else {
      embed = {
        ...embed,
        fields: setMessageFields(list),
      }
    }
    return embed;
  }
};
function setMessageFields(list) {
  const fields = [];
  list.forEach((el, idx) => {
    fields.push({
      name: `${idx + 1}] ${el.title} (${convertSecondToString(el.time)})`,
      value: '\u200B'
    })
  });
  return fields;
}