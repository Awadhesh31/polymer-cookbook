const indexjs = require('./index');

var port = process.argv[2];
console.log(port);

indexjs.testTrigger(port);