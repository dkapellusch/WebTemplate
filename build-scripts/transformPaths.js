const fs = require('fs');
const glob = require('glob');
const path = require('path');
const parser = new require('argparse').ArgumentParser({ addHelp: true });
const os = require('os');

function* removeCharacters(obj) {
	let keys = Object.keys(obj);
	let removeStar = (s) => s.replace(/\*/, '');
	for (const key of keys) {
		yield { [removeStar(key)]: removeStar(obj[key][0]) };
	}
}

parser.addArgument([ '-r', '--root' ], {
	dest: 'rootPath',
	metavar: 'rootPath',
	type: 'string',
	help: 'Path to root of project'
});

parser.addArgument([ '-p', '--project' ], {
	dest: 'projectConfig',
	metavar: 'projectConfig',
	type: 'string',
	help: 'Path to tsconfig file for project'
});

let { rootPath, projectConfig } = parser.parseArgs();

function transform(rPath, tsPath) {
	rootPath = rootPath || rPath || './compiled-server';
	projectConfig = projectConfig|| tsPath  || './tsconfig.server.json';

	let fullConfigPath = path.resolve(process.cwd().toString(), projectConfig.toString());
	let fullRootPath = path.resolve(process.cwd().toString(), rootPath.toString());
	let tsConfig = JSON.parse(fs.readFileSync(fullConfigPath).toString());

	let paths = tsConfig.compilerOptions.paths;
	let cleanedPaths = Array.from(removeCharacters(paths)).map((o) => [ Object.keys(o)[0], o[Object.keys(o)[0]] ]);

	glob('**/*.js', { cwd: './compiled-server' }, (er, files) => {
		for (const file of files) {
			let outLines = [];
			let currentFilePath = path.resolve(process.cwd(), './compiled-server', file);
			for (const line of fs.readFileSync(currentFilePath).toString().split(os.EOL)) {
				let lineToWrite = line;
				for (const cleanPath of cleanedPaths) {
					if (line.includes(cleanPath[0])) {
						let refAbsolutePath = path.resolve(process.cwd(), './compiled-server', cleanPath[1]);
						let rel =
							path.relative(path.dirname(currentFilePath), refAbsolutePath).replace(/\\/g, '/') + '/';
						lineToWrite = lineToWrite.replace(cleanPath[0], rel);
					}
				}
				outLines.push(lineToWrite);
			}
			fs.writeFileSync(path.resolve('./compiled-server/', file), outLines.join('\n'));
		}
	});
}

module.exports = transform;