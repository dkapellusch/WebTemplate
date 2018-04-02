const fs = require('fs');
const glob = require('glob');
const path = require('path');
const parser = new require('argparse').ArgumentParser({ addHelp: true });
const os = require('os');

function* removeStars(obj) {
    let keys = Object.keys(obj);
    let removeStar = (s) => s.replace(/\*/, '');
    for (const key of keys) {
        yield {
            [removeStar(key)]: removeStar(obj[key][0])
        };
    }
}

parser.addArgument(['-r', '--root'], {
    dest: 'rootPath',
    metavar: 'rootPath',
    type: 'string',
    help: 'Path to output of project'
});

parser.addArgument(['-p', '--project'], {
    dest: 'projectConfig',
    metavar: 'projectConfig',
    type: 'string',
    help: 'Path to tsconfig file for project'
});

let { rootPath, projectConfig } = parser.parseArgs();

function transform(rPath, tsPath) {
    rootPath = rootPath || rPath || './compiled-server';
    projectConfig = projectConfig || tsPath || './tsconfig.server.json';

    let fullConfigPath = path.resolve(process.cwd().toString(), projectConfig.toString());
    let fullRootPath = path.resolve(process.cwd().toString(), rootPath.toString());
    let tsConfig = JSON.parse(fs.readFileSync(fullConfigPath).toString());

    let paths = tsConfig.compilerOptions.paths;
    let cleanedPaths = Array.from(removeStars(paths)).map((o) => [Object.keys(o)[0], o[Object.keys(o)[0]]]);

    glob('**/*.js', { cwd: rootPath }, (er, files) => {
        let containsPath = new RegExp(cleanedPaths.map(c => c[0]).join("|")).compile();

        for (const file of files) {
            let outLines = [];
            let anyChanged = false;
            let currentFilePath = path.resolve(process.cwd(), rootPath, file);
            let currentFile = fs.readFileSync(currentFilePath).toString();

            if (!containsPath.test(currentFile)) {
                continue;
            }

            for (const line of currentFile.split(os.EOL)) {
                let lineToWrite = line;

                if (!containsPath.test(lineToWrite)) {
                    continue;
                }
                
                for (const cleanPath of cleanedPaths) {

                    if (line.includes(cleanPath[0])) {
                        let refAbsolutePath = path.resolve(process.cwd(), rootPath, cleanPath[1]);
                        let rel =
                            path.relative(path.dirname(currentFilePath), refAbsolutePath).replace(/\\/g, '/') + '/';
                        rel = rel.startsWith("./") ? rel : "./" + rel;
                        lineToWrite = lineToWrite.replace(cleanPath[0], rel);
                        anyChanged = true;
                    }
                }

                outLines.push(lineToWrite);
            }
 
            if (anyChanged === true) {
                fs.writeFileSync(path.resolve(rootPath, file), outLines.join('\n'));
            }
        }
    });
}

module.exports = transform;