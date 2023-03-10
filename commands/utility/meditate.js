const {covertArrayArgsToObjectArgs} = require("../../utils/transform.util");
const { MessageEmbed } = require('discord.js');
const {DateTime} = require('luxon');
const ytdl = require('ytdl-core');

module.exports = {
  name: 'meditate',
  description: 'Meditation Session with start and stop sound in time interval',
  execute(message, args) {
    const info = covertArrayArgsToObjectArgs(args);
    let channel;
    if(info.channel) {
      channel = message.guild.channels.cache.find(ch => ch.name === 'Training');
    } else {
      channel = message.member.voice.channel;
    }
    console.log(info)
    if(!channel) { message.reply(`:x: Bot haven't find the voice channel`); return; }
    if(info.sound && !ytdl.validateURL(info.sound)) { message.reply(`:x: invalid youtube start sound url`); return; }
    if(info.notify && !ytdl.validateURL(info.notify)) { message.reply(`:x: invalid youtube notify sound url`); return; }
    const streamOptions = { seek: 0, volume: 0.8 };
    channel.join()
      .then(connection => {
        if(info.sound) {
          const startStream = ytdl(info.soundl, {
            filter: 'audioonly',
            fmt: "mp3",
            highWaterMark: 1 << 62,
            liveBuffer: 1 << 62,
            dlChunkSize: 0, //disabling chunking is recommended in discord bot
            bitrate: 128,
            quality: "lowestaudio",
          });
          connection.play(startStream, streamOptions)
            .on('start', () => {
              this.showDescription(message, info);
            });
        }
        if (info.time) {
          setTimeout(() => {
            if (info.notify) {
              const endStream = ytdl(info.notify, { filter: 'audioonly' });
              connection.play(endStream, streamOptions)
              .on('start', () => {
                this.showEnded(message, info);
              })
              .on('finish', () => {
                channel.leave();
              });
            } else {
              this.showEnded(message, info);
              channel.leave();
            }
          }, parseInt(info.time, 10) * 60 * 1000)
        }
      }).catch(e => console.log('Error: ', e));
    return;
  },

  // private
  showDescription(message, info) {
    const now = DateTime.now().setZone('UTC+7');
    message.channel.send('', {
      embed: new MessageEmbed()
        .setColor('YELLOW')
        .setTitle('Meditation event has started')
        .setAuthor(message.member.user.username, message.member.user.displayAvatarURL(), 'https://discord.js.org')
        .setDescription('????????????????????? Set Zero ?????????????????????')
        .setThumbnail('https://img.apksum.com/72/com.pransuinc.notifybubble/1.4/icon.png')
        .addField('?????????????????????', `${info.time} ????????????`)
        .addField('???????????????????????????', now.toFormat('HH:mm'), true)
        .addField('?????????????????????', now.plus({minutes: info.time}).toFormat('HH:mm'), true)
        .setImage('https://i.pinimg.com/originals/be/51/8e/be518e826ab86ba8ed5f98c672c76caa.jpg')
    });
  },
  // private
  showEnded(message, info) {
    message.channel.send('', {
      embed: new MessageEmbed()
        .setColor('RED')
        .setTitle('Meditation event has ended')
        .setDescription('????????????????????????????????????????????????????????????????????????????????????????????? ???????????????????????????????????????????????????????????????????????????')
        .setThumbnail('https://i.pinimg.com/originals/be/51/8e/be518e826ab86ba8ed5f98c672c76caa.jpg')
        .addField('?????????????????????', `${info.time} ????????????`, true)
        .addField('?????????????????????????????????', `${message.member.voice.channel.members.size - 1} ??????`, true)
        .setTimestamp()
    });
  }
};
