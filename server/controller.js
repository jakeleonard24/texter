var twilio = require('twilio');
require('dotenv').config();



module.exports.sendSms = function(to, message) {
    var client = require('twilio')('AC4be1951c5b0789b50445087252de06b6', '4af63fb12336734be8d6ae283c9ff3d6');
    // console.log(client.api.messages.create())
    return client.api.messages
      .create({
        body: message,
        to: to,
        from: '+12174412691',
      }).then(function(data) {
        console.log('Administrator notified');
      }).catch(function(err) {
        console.error('Could not notify administrator');
        console.error(err);
      });
  };