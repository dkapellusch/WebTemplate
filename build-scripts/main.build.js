let path = require('path');
let copyServer = require('./copyServerConfig');
let scripts = [ copyServer ];

for (const script of scripts) {
	script();
}
