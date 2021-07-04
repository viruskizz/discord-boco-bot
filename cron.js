const cron = require('node-cron');
const sheetUtil = require('./utils/sheet.util');
cron.schedule('0 * * * * *', () => {
  // code
  console.log('CRON!!');
});

(async function() {
  const doc = await sheetUtil.init('1Sbdv_0hL9yMtlh2jE7uoqCHAXgSuz90o4LDv72Bugyc');
  await doc.loadInfo(); // loads document properties and worksheets
  console.log(doc.title);
})();
