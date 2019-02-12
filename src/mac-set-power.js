var exec = require('child_process').exec;
var env = require('./env');

function setPowerStatus(config, status, callback) {

  var iface = 'en0';
  var commandStr = "networksetup -setairportpower ";

  if (config.iface) {
      iface = config.iface.toString();
  }

  commandStr = commandStr + "'" + iface + "'" + " " + "'" + status+ "'";

  exec(commandStr, {env}, function(err, resp, stderr) {
    // console.log(stderr, resp);
    if (resp && resp.indexOf('Failed') >= 0) {
      callback && callback(resp);
    } else {
      callback && callback(null, status);
    }
  });
}

module.exports = function (config) {
  return function (status, callback) {
    if (callback) {
      setPowerStatus(config, status, callback);
    } else {
      return new Promise(function (resolve, reject) {
        setPowerStatus(config, function (err, status) {
          if (err) {
            reject(err);
          } else {
            resolve(status);
          }
        })
      });
    }
  }

};
