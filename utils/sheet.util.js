const { GoogleSpreadsheet } = require('google-spreadsheet');

module.exports = {
  async init(docId) {
    const creds = require('../configs/discord-318808-be4c2e1fe37b'); // the file saved above
    const doc = new GoogleSpreadsheet(docId);
    await doc.useServiceAccountAuth(creds);
    return doc;
  }
};
