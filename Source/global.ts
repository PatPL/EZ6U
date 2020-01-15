import Path = require ("path");
import Config from "./config";

let Global = {
    WWWRootPath: Path.join (process.cwd (), Config.WebsiteRoot),
    Version: "0.1.0",
}

export default Global