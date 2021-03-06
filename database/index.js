const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blockexplore');

let accountSchema = mongoose.Schema({
  address: {type: String, unique: true},
  balance: {type: Number},
  sent: {type: Number},
  received: {type: Number},
  recent_transactions: [{
    hash: {type: String},
    amount: {type: Number},
    date: {type: String}
  }]
});

let Account = mongoose.model('Account', accountSchema);

let save = (blockData, callback) => {
  Account.find({'address': blockData.address}, function(err, results) {
    if (err) {
      return console.error(err);
    } else {
      if (results.length === 0) {
        var account = new Account({
          address: blockData.address,
          balance: blockData.balance,
          sent: blockData.sent,
          received: blockData.received,
          recent_transactions: blockData.recent_transactions
        });
        account.save(function(err, newAccount) {
          if (err) {
            return console.error(err);
          } else {
            console.log('Data was successfully saved!');
            console.log(newAccount);
            callback();
          }
        });
      } else {
        callback();
      }
    }
  });
};

module.exports.save = save;
module.exports.Account = Account;