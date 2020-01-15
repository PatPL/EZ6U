import Path = require ("path");
import fs = require ("fs");

import { Express, NextFunction } from "express";
import Global from "./global";
import Config from "./config";

const Route = (App: Express) => {
    App.get ("/*", (req, res, next) => {
        let requestURL = `${ req.header ("host") }${ req.url }`;
        let requestedPath = Path.join (Global.WWWRootPath, req.url);
        
        if (!fs.existsSync (requestedPath)) {
            // Requested file doesn't exist
            res.statusCode = 404;
            res.statusMessage = "File not found";
            
            let html = "";
            html += "<style>body{ font-family: Verdana; font-size: 16px; }</style>";
            html += `Resource <b>${ requestURL }</b> was not found<br>`;
            html += `<a href="${ `${ req.url }${ req.url.endsWith ("/") ? "" : "/" }..` }">Go a level up</a>`;
            
            res.type ("html");
            res.send (html);
            res.end ();
            return;
        }
        
        if (fs.lstatSync (requestedPath).isDirectory ()) {
            // Force the directory name to end with '/'
            req.url = req.url.endsWith ("/") ? req.url : `${ req.url }/`;
            
            // Serve index.html, if it exists
            if (
                Config.FileExplorer_ServeIndexOverDirectory &&
                fs.existsSync (Path.join (requestedPath, "index.html"))
            ) {
                res.sendFile (Path.join (requestedPath, "index.html"), () => {
                    res.end ();
                });
                return;
            }
            
            // Serve the directory contents
            let files = fs.readdirSync (requestedPath);
            
            let html = "";
            html += "<style>body{ font-family: Verdana; font-size: 16px; }</style>";
            html += `Contents of <b>${ requestURL }</b><br>`
            html += "<ul>";
            
            // Don't show .. if already in root directory
            if (req.url != "/") {
                html += `<li><a href="${ `${ req.url }..` }">..</a></li>`;
            }
            
            files.forEach (filename => {
                let filePath = Path.join (requestedPath, filename);
                if (fs.lstatSync (filePath).isDirectory ()) {
                    html += `<li><a href="${ req.url }${ filename }">${ filename }/</a></li>`
                } else {
                    html += `<li><a href="${ req.url }${ filename }">${ filename }</a></li>`
                }
            });
            
            html += "</ul>";
            
            res.statusCode = 200;
            res.type ("html");
            res.send (html);
            res.end ();
            return;
        }
        
        // Fall-through to regular Express file serving
        next ();
    });
}

export default Route;