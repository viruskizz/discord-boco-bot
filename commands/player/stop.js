const playlistDb = require('../../databases/playlist');

module.exports = {
  name: 'stop',
  args: false,
  description: `Stop the Boko's music player`,
  async execute(message, args) {
    const errorReply = `:x: Bot haven't joined the voice channel use command \`/gg.play <youtube url>\``;
    if(!message.guild.voice) { message.reply(errorReply); return; }
    if(!message.guild.voice.channel) { message.reply(errorReply); return; }
    if(!message.member.voice) { message.reply(`:x: User haven't joined the voice channel`); return; }
    if(message.guild.voice.channelID !== message.member.voice.channelID) { message.reply(`:x: User haven't joined in same the voice channel with Boko Bot`); return;}
    message.guild.voice.connection.dispatcher.destroy();
    await playlistDb.updatePlayState(message.channel.guild.id, false);
  },
};
