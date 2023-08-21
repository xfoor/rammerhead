const path = require('path');
const fs = require('fs');
const os = require('os');
const RammerheadJSMemCache = require('./classes/RammerheadJSMemCache.js');
const RammerheadJSFileCache = require('./classes/RammerheadJSFileCache.js');
const enableWorkers = os.cpus().length !== 1;
const PORT = process.env.PORT || 3000;
module.exports = {
    bindingAddress: '0.0.0.0',
    port: PORT,
    crossDomainPort: 8081,
    publicDir: path.join(__dirname, '../public'), // set to null to disable
    enableWorkers,
    workers: os.cpus().length,
    ssl: null,
    getServerInfo: () => ({ hostname: 'localhost', port: PORT, crossDomainPort: 8081, protocol: 'http:' }),
    password: null,
    disableLocalStorageSync: false,
    restrictSessionToIP: false,
    jsCache: new RammerheadJSFileCache(path.join(__dirname, '../cache-js'), 5 * 1024 * 1024 * 1024, 50000, enableWorkers),
    stripClientHeaders: [],
    rewriteServerHeaders: {},
    fileCacheSessionConfig: {
        saveDirectory: path.join(__dirname, '../sessions'),
        cacheTimeout: 1000 * 60 * 20, // 20 minutes
        cacheCheckInterval: 1000 * 60 * 10, // 10 minutes
        deleteUnused: true,
        staleCleanupOptions: {
            staleTimeout: 1000 * 60 * 60 * 24 * 3, // 3 days
            maxToLive: null,
            staleCheckInterval: 1000 * 60 * 60 * 6 // 6 hours
        },

        deleteCorruptedSessions: true,
    },

  
    logLevel: process.env.DEVELOPMENT ? 'debug' : 'info',
    generatePrefix: (level) => `[${new Date().toISOString()}] [${level.toUpperCase()}] `,

    
    getIP: (req) => req.socket.remoteAddress
};

if (fs.existsSync(path.join(__dirname, '../config.js'))) Object.assign(module.exports, require('../config'));
