const path = require('path');
const copyServer = require('./copyServerConfig');
const transformPath = require('./transformPaths');

const scripts = [ copyServer, transformPath ];

for (const script of scripts) {
	script();
}
