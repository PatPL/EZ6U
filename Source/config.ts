import fs = require ("fs");
import path = require ("path");

const configFileName = "EZ6U_config.json";
const configFilePath = path.join (process.cwd (), configFileName);
const defaultConfig = {
    Port: 3167,
    OpenInBrowser: true,
    WebsiteRoot: "./",
    FileExplorer_Enable: true,
    FileExplorer_ServeIndexOverDirectory: true,
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
        if (e instanceof SyntaxError) {
            // Encountered an error while parsing the JSON
            console.log (`Couldn't parse ${ configFileName }:`);
            console.log ("Error message: ", e.message);
            console.log (`Remove the config file to rebuild it`);
            console.log (`Aborting...`);
            process.exit (-1);
        } else {
            console.log (`Encountered an unknown error in ${ configFileName }:`);
            console.log (e);
            console.log ("Aborting...");
            process.exit (-1);
        }
    }
} else {
    // Config file doesn't exist
    // It'll be created later
}

// Write to rebuild missing values
fs.writeFileSync (configFilePath, JSON.stringify (Config, undefined, 4));

export default Config;