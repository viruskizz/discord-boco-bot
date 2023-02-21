const {convertSecondToString} = require('../../utils/transform.util');
const {playlist} = global;

module.exports = {
  name: 'list',
  description: `list Boco's Music Playlist`,
  execute(message, args) {
    let embed = this.setEmbedMessage();
    message.channel.send('', { embed });
  },
  setEmbedMessage() {
    let embed = {
      type: 'rich',
      color: '#f9f504',
      title: `Boco's Music Playlist`,
    };
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