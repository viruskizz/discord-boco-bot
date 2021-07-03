module.exports = {
  name: 'test',
  description: 'Test!',
  execute(message, args) {
    console.log(args);
    message.channel.send('TEST.');
  },
};
