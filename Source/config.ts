import fs = require ("fs");
import path = require ("path");

const configFileName = "EZ6U_config.json";
const configFilePath = path.join (process.cwd (), configFileName);
const defaultConfig = {
    Port: 3167,
    OpenInBrowser: true,
    WebsiteRoot: "./"
}

let Config: typeof defaultConfig = defaultConfig;

if (fs.existsSync (configFilePath)) {
    // Config file exists, try to read it and parse it
    try {
        let fileConfig = JSON.parse (fs.readFileSync (configFilePath).toString ());
        
        Config = {
            ...Config,
            ...fileConfig
        };
    } catch (e) {
        console.error (`Error in ${ configFileName }:`);
        console.error (e);
    }
} else {
    // Config file doesn't exist
    // It'll be created later
}

// Write the config to rebuild missing default values
fs.writeFileSync (configFilePath, JSON.stringify (Config, undefined, 4));

export default Config;