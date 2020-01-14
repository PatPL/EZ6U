import Express = require ("express");

const App = Express ();

App.use (Express.static (process.cwd ()));

console.log (`Static path: ${ process.cwd () }`);
console.log ("Listening on localhost:8686");
App.listen (8686);