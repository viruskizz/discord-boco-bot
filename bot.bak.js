require('dotenv').config();
const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const ytdl = require('ytdl-core');
const client = new Discord.Client();

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands`);
  // set a new item in the Collection
  // with the key as the command name and the value as the exported module
  client.commands.set(command.name, command);
}

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async (message) => {
  console.log(message.content);

  if (message.content.startsWith('/gg.welcome')) {
    const member = message.member;
    message.channel.send('', {
      embed: new Discord.MessageEmbed()
        .setColor('ORANGE')
        // .setTitle('Welcome')
        // .setURL('https://www.facebook.com/good.geek.community/')
        .setAuthor(member.guild.name, member.guild.iconURL(), 'https://www.facebook.com/good.geek.community')
        .setDescription(`ยินดีต้อนรับ @${member.user.username} เข้าสู่เซิร์ฟเวอร์ ${member.guild.name} สังคม IT บรรยากาศดีๆ แห่งการเรียนรู้และพัฒนาตนเอง`)
        .setThumbnail(member.user.avatarURL())
        .setTimestamp()
        .setFooter(member.user.tag)
    });
  }

  if (message.content.startsWith('/gg.notify')) {
    message.channel.send('@here', {
      embed: new Discord.MessageEmbed()
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
  }

  let cmd = '/gg.play';
  if(message.content.startsWith(cmd)) {
    const msgOption = message.content.substring(cmd.length).trim();
    if(!msgOption.startsWith('http')) { return; }
    const youtubeUrl = msgOption;
    const streamOptions = { seek: 0, volume: 0.8 };
    const stream = ytdl(youtubeUrl, { filter: 'audioonly' });
    if(message.guild.voice && message.guild.voice.channelID) {
      message.guild.voice.connection.play(stream, streamOptions);
      return;
    }
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
  }
  const errorReply = `:x: Bot haven't joined the voice channel use command \`/gg.play <youtube url>\``;
  if(message.content.startsWith('/gg.pause')) {
    if(!message.guild.voice) { message.reply(errorReply); return; }
    if(!message.member.voice) { message.reply(`:x: User haven't joined the voice channel`); return; }
    if(message.guild.voice.channelID !== message.member.voice.channelID) { message.reply(`:x: User haven't joined in same the voice channel with Boko Bot`); return;}
    if(message.guild.voice.channel) {
      message.guild.voice.connection.dispatcher.pause();
    } else {
      message.reply(errorReply); return;
    }
  }
  if(message.content.startsWith('/gg.resume')) {
    if(!message.guild.voice) { message.reply(errorReply); return; }
    if(!message.member.voice) { message.reply(`:x: User haven't joined the voice channel`); return; }
    if(message.guild.voice.channelID !== message.member.voice.channelID) { message.reply(`:x: User haven't joined in same the voice channel with Boko Bot`); return;}
    if(message.guild.voice.channel) {
      message.guild.voice.connection.dispatcher.resume();
    } else {
      message.reply(errorReply); return;
    }
  }
  if(message.content.startsWith('/gg.stop')) {
    if(!message.guild.voice) { message.reply(errorReply); return; }
    if(!message.member.voice) { message.reply(`:x: User haven't joined the voice channel`); return; }
    if(message.guild.voice.channelID !== message.member.voice.channelID) { message.reply(`:x: User haven't joined in same the voice channel with Boko Bot`); return;}
    if(message.guild.voice.channel) {
      message.guild.voice.connection.dispatcher.destroy();
    } else {
      message.reply(errorReply); return;
    }
  }
  if(message.content.startsWith('/gg.leave')) {
    if(!message.guild.voice) { message.reply(errorReply); return; }
    if(!message.member.voice) { message.reply(`:x: User haven't joined the voice channel`); return; }
    if(message.guild.voice.channelID !== message.member.voice.channelID) { message.reply(`:x: User haven't joined in same the voice channel with Boko Bot`); return;}
    if(message.guild.voice.channel) {
      message.guild.voice.channel.leave();
    } else {
      message.reply(errorReply); return;
    }
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
