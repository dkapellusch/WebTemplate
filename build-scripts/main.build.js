const path = require('path');
const copyServerConfig = require('./copyServerConfig');
const transformPath = require('./transformPaths');

const scripts = [ copyServerConfig, transformPath ];

for (const script of scripts) {
	script();
}
