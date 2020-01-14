import Express = require ("express");
import openurl = require ("openurl");
import Path = require ("path");

import Config from "./config";

const Version = "0.0.0";

const App = Express ();
const WWWRootPath = Path.join (process.cwd (), Config.WebsiteRoot);

console.log (`EZ6U v${ Version }`);

console.log (`Static path: ${ WWWRootPath }`);
App.use (Express.static (WWWRootPath));

if (Config.OpenInBrowser) {
    openurl.open (`http://localhost:${ Config.Port }`);
}

console.log (`Listening on localhost:${ Config.Port }`);
App.listen (Config.Port);