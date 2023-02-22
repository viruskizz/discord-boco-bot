module.exports = {
  name: 'pause',
  args: false,
  description: `Pause the Boko's music player`,
  execute(message, args) {
    if(!message.guild.voice) { message.reply(`:x: Bot haven't joined the voice channel use command \`/??play <youtube url>\``); return; }
    if(!message.guild.voice.channel) { message.reply(`:x: Bot haven't joined the voice channel use command \`/??play <youtube url>\``); return; }
    if(!message.member.voice) { message.reply(`:x: User haven't joined the voice channel`); return; }
    if(message.guild.voice.channelID !== message.member.voice.channelID) { message.reply(`:x: User haven't joined in same the voice channel with Boko Bot`); return;}
    message.guild.voice.connection.dispatcher.pause();
  },
};
