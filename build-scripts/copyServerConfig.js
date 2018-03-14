const fs = require("fs");
const path = require("path");

function copyServerConfig() {
    let configSrc = path.resolve(__dirname,"../server/server.config.json");
    let configDest = path.resolve(__dirname, "../compiled-server/server.config.json");

    fs.copyFileSync(configSrc, configDest )
}

module.exports = copyServerConfig;