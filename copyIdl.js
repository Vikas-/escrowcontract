const fs = require('fs');
const idl = require('./target/idl/escrowcontract.json');

fs.writeFileSync('./app/src/idl.json', JSON.stringify(idl));
