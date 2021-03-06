var windowsConnect = require('./windows-connect.js');
var windowsScan = require('./windows-scan.js');
var windowsDisconnect = require('./windows-disconnect.js');
var windowsGetCurrentConnections = require('./windows-current-connections');
var linuxConnect = require('./linux-connect');
var linuxDisconnect = require('./linux-disconnect');
var linuxGetCurrentConnections = require('./linux-current-connections');
var linuxScan = require('./linux-scan.js');
var macConnect = require('./mac-connect.js');
var macScan = require('./mac-scan.js');
var macGetCurrentConnections = require('./mac-current-connections');
var macGetPowerStatus = require('./mac-power-status');
var macSetPowerStatus = require('./mac-set-power');

var config = {
    debug : false,
    iface : null
};

function notSupported() {
    throw new Error("ERROR : operation not supported for the platform");
};

function init(options) {
    if (options && options.debug) {
        config.debug = options.debug;
    }

    if (options && options.iface) {
        config.iface = options.iface;
    }

    var scan = function () {
        throw new Error("ERROR : not available for this OS");
    };
    var connect = function () {
        throw new Error("ERROR : not available for this OS");
    };
    var disconnect = function () {
        throw new Error("ERROR : not available for this OS");
    };
    var getCurrentConnections = function () {
        throw new Error("ERROR : not available for this OS");
    };

    switch(process.platform) {
        case "linux":
            connect = linuxConnect(config);
            scan = linuxScan(config);
            disconnect = linuxDisconnect(config);
            getCurrentConnections = linuxGetCurrentConnections(config);
            break;
        case "darwin":
            connect = macConnect(config);
            scan = macScan(config);
            getCurrentConnections = macGetCurrentConnections(config);
            getPowerStatus = macGetPowerStatus(config);
            setPowerStatus = macSetPowerStatus(config);
            break;
        case "win32":
            connect = windowsConnect(config);
            scan = windowsScan(config);
            disconnect = windowsDisconnect(config);
            getCurrentConnections = windowsGetCurrentConnections(config);
            break;
        default:
            throw new Error("ERROR : UNRECOGNIZED OS");
    }
    exports.scan = scan;
    exports.connect = connect;
    exports.disconnect = disconnect;
    exports.getCurrentConnections = getCurrentConnections;
    exports.getPowerStatus = getPowerStatus;
    exports.setPowerStatus = setPowerStatus;
}

exports.init = init;
exports.scan = function () {
    throw new Error("ERROR : use init before");
};

exports.connect = function () {
    throw new Error("ERROR : use init before");
};

exports.disconnect = function () {
    throw new Error("ERROR : use init before");
};

exports.getCurrentConnections = function () {
    throw new Error("ERROR : use init before");
};

exports.getPowerStatus = function () {
    throw new Error("ERROR : use init before");
}

exports.macSetPowerStatus = function () {
    throw new Error("ERROR : use init before");
}
