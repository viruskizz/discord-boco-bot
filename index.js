require('dotenv').config();
require('./cron');
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = process.env.PREFIX;
client.commands = new Discord.Collection();

const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {
  const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    client.commands.set(command.name, command);
  }
}

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (!client.commands.has(command)) return;
  try {
    const clientCommand = client.commands.get(command);
    if (clientCommand.args && !args.length) {
      let reply = `You didn't provide any arguments, ${message.author}!`;
      if (clientCommand.usage) {
        reply += `\nThe proper usage would be: \`${prefix}${clientCommand.name} ${clientCommand.usage}\``;
      }
      return message.reply(reply);
    }
    client.commands.get(command).execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('there was an error trying to execute that command!');
  }
});

// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome');
  // Do nothing if the channel wasn't found on this server
  console.log('CH: ', channel);
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send('', {
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
});

// Create an event listener for new guild members
client.on('guildMemberRemove', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome');
  // Do nothing if the channel wasn't found on this server
  console.log('CH: ', channel);
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send('', {
    embed: new Discord.MessageEmbed()
      .setColor('ORANGE')
      // .setTitle('Welcome')
      // .setURL('https://www.facebook.com/good.geek.community/')
      .setAuthor(member.guild.name, member.guild.iconURL(), 'https://www.facebook.com/good.geek.community')
      .setDescription(`ลาก่อน @${member.user.username} จากเซิร์ฟเวอร์ ${member.guild.name} แล้วไว้พบกันใหม่`)
      .setThumbnail(member.user.avatarURL())
      .setTimestamp()
      .setFooter(member.user.tag)
  });
});

client.login(process.env.DISCORD_BOT_TOKEN);
