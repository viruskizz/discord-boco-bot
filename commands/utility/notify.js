const {MessageEmbed} = require('discord.js');

module.exports = {
  name: 'notify',
  description: 'Notify!',
  execute(message, args) {
    console.log(args);
    message.channel.send('@here', {
      embed: new MessageEmbed()
        .setColor('YELLOW')
        .setTitle('SET Zero Event')
        .setURL('https://discord.com/')
        .setAuthor('Araiva', 'https://www.siliconera.com/wp-content/uploads/2020/04/ICON_CLOUD.jpg', 'https://discord.js.org')
        .setDescription('ถึงเวลา Set Zero กันแล้ว')
        .setThumbnail('https://img.apksum.com/72/com.pransuinc.notifybubble/1.4/icon.png')
        .addField('เหลือเวลาอีก', '30 นาที')
        .addField('เริ่มเวลา', '21:00', true)
        .addField('สิ้นสุด', '21:30', true)
        .setImage('https://meditationsphere.com/wp-content/uploads/2020/03/how-many-times-a-day-should-i-meditate-800x488.jpg')
    });
  },
};
