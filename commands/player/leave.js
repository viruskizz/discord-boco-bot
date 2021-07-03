module.exports = {
  name: 'leave',
  args: false,
  description: 'Disconnect Boko from voice channel',
  execute(message, args) {
    const errorReply = `:x: Bot haven't joined the voice channel use command \`/gg.play <youtube url>\``;
    if(!message.guild.voice) { message.reply(errorReply); return; }
    if(!message.guild.voice.channel) { message.reply(errorReply); return; }
    if(!message.member.voice) { message.reply(`:x: User haven't joined the voice channel`); return; }
    if(message.guild.voice.channelID !== message.member.voice.channelID) { message.reply(`:x: User haven't joined in same the voice channel with Boko Bot`); return;}
    message.guild.voice.channel.leave();
  },
};
