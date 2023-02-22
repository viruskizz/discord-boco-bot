module.exports = {
  name: 'test',
  description: 'Test!',
  execute(message, args) {
    console.log(args);
    console.log(message.channel.guild.name)
    console.log(message.channel.guild.id)
    message.channel.send('TEST.');
  },
};
