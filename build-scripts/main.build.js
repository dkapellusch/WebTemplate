let path = require('path');
let copyServer = require('./copyServerConfig');
let transformPath = require('./transformPaths');
let scripts = [ copyServer, transformPath ];

for (const script of scripts) {
	script();
}
