import Express = require ("express");
import openurl = require ("openurl");
import Path = require ("path");

import Config from "./config";
import Global from "./global";
import FileExplorer from "./fileExplorer";

const App = Express ();

console.log (`EZ6U v${ Global.Version }`);

if (Config.FileExplorer_Enable) {
    FileExplorer (App);
}

console.log (`Static path: ${ Global.WWWRootPath }`);
App.use (Express.static (Global.WWWRootPath));

if (Config.OpenInBrowser) {
    openurl.open (`http://localhost:${ Config.Port }`);
}

console.log (`Listening on localhost:${ Config.Port }`);
App.listen (Config.Port);