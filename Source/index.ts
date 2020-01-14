import Express = require ("express");

const App = Express ();

App.use (Express.static (__dirname));

console.log (`Static path: ${ __dirname }`);
console.log ("Listening on localhost:8686");
App.listen (8686);