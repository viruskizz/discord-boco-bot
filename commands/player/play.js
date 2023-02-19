const ytdl = require('ytdl-core');

module.exports = {
  name: 'play',
  args: true,
  usage: '<youtube url>',
  description: `Play Boco's music player`,
  execute(message, args) {
    const youtubeUrl = args[0];
    if(!youtubeUrl.startsWith('http')) { return; }
    const streamOptions = { seek: 0, volume: 0.8 };
    const stream = ytdl(youtubeUrl, { filter: 'audioonly' });
    if(message.guild.voice && message.guild.voice.channelID) {
      message.guild.voice.connection.play(stream, streamOptions);
      return;
    }
    if(!message.member.voice.channelID) { message.reply(`:x: User haven't joined the voice channel`); return; }
    const voiceChannel = message.member.voice.channel;
    voiceChannel.join().then(connection => {
      const stream = ytdl(youtubeUrl, { filter: 'audioonly' });
      connection.play(stream, streamOptions)
        .on('start', () => {
          message.reply('Boko BOT is playing the music :musical_keyboard:');
        })
        .on('finish', () => {
          voiceChannel.leave();
        });
    }).catch(e => console.log('Error: ', e));
  },
};
