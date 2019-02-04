var exec = require('child_process').exec;
var env = require('./env');

function getPowerStatus(config, callback) {

  var iface = 'en0';
  var commandStr = "networksetup -getairportpower ";

  if (config.iface) {
      iface = config.iface.toString();
  }

  commandStr = commandStr + "'" + iface + "'";
  // console.log(commandStr);

  exec(commandStr, {env}, function(err, resp, stderr) {
    // console.log(stderr, resp);
    if (resp && resp.indexOf('Failed') >= 0) {
      callback && callback(resp);
    } else if (resp && resp.indexOf('On') >= 0) {
      callback && callback(null, "On");
    } else {
      callback && callback(null, "Off");
    }
  });
}

module.exports = function (config) {
  return function (callback) {
    if (callback) {
      getPowerStatus(config, callback);
    } else {
      return new Promise(function (resolve, reject) {
        getPowerStatus(config, function (err, status) {
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
