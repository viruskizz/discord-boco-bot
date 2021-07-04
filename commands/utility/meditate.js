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
    if(!channel) { message.reply(`:x: Bot haven't find the voice channel`); return; }
    if(info.sound && !ytdl.validateURL(info.sound)) { message.reply(`:x: invalid youtube start sound url`); return; }
    if(info.notify && !ytdl.validateURL(info.notify)) { message.reply(`:x: invalid youtube notify sound url`); return; }
    const streamOptions = { seek: 0, volume: 0.8 };
    channel.join()
      .then(connection => {
        if(info.sound) {
          console.log('SOUND!!');
          const startStream = ytdl(info.sound, { filter: 'audioonly' });
          connection.play(startStream, streamOptions)
            .on('start', () => {
              this.showDescription(message, info);
            });
        }
        setTimeout(() => {
          const endStream = ytdl(info.notify, { filter: 'audioonly' });
          connection.play(endStream, streamOptions)
            .on('start', () => {
              this.showEnded(message, info);
            }).on('finish', () => {
              channel.leave();
          });
        }, info.time * 60 * 1000)
    });
  },

  // private
  showDescription(message, info) {
    const now = DateTime.now().setZone('UTC+7');
    message.channel.send('', {
      embed: new MessageEmbed()
        .setColor('YELLOW')
        .setTitle('Meditation event has started')
        .setAuthor(message.member.user.username, message.member.user.displayAvatarURL(), 'https://discord.js.org')
        .setDescription('ถึงเวลา Set Zero กันแล้ว')
        .setThumbnail('https://img.apksum.com/72/com.pransuinc.notifybubble/1.4/icon.png')
        .addField('ใช้เวลา', `${info.time} นาที`)
        .addField('เริ่มเวลา', now.toFormat('HH:mm'), true)
        .addField('สิ้นสุด', now.plus({minutes: info.time}).toFormat('HH:mm'), true)
        .setImage('https://meditationsphere.com/wp-content/uploads/2020/03/how-many-times-a-day-should-i-meditate-800x488.jpg')
    });
  },
  // private
  showEnded(message, info) {
    message.channel.send('', {
      embed: new MessageEmbed()
        .setColor('RED')
        .setTitle('Meditation event has ended')
        .setDescription('ขอบคุณทุกท่านที่เข้าร่วมกิจกรรม แล้วพบกันอีกครั้งในรอบต่อ')
        .setThumbnail('https://meditationsphere.com/wp-content/uploads/2020/03/how-many-times-a-day-should-i-meditate-800x488.jpg')
        .addField('ใช้เวลา', `${info.time} นาที`, true)
        .addField('ผู้เข้าร่วม', `${message.member.voice.channel.members.size - 1} คน`, true)
        .setTimestamp()
    });
  }
};
