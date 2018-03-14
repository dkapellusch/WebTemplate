import * as express from 'express';
import * as path from 'path';
import { readFileSync } from 'fs';
import { mongooseConnector } from './persistence/mongooseConnector';
import { shovelActivity } from './persistence/models/shovelLoadActivities.model';
import { shovelUnit } from './persistence/models/shovelUnit.model';

(async function() {
	const PORT = process.env.PORT || 8080;
	const APP = express();
	const CONFIG_PATH = path.resolve(__dirname, './server.config.json');
	const CONFIG_FILE = readFileSync(CONFIG_PATH).toString();
	const CONNECTION_STRING = JSON.parse(CONFIG_FILE).ConnectionStrings.Local;

	const DB_CONNECTOR = new mongooseConnector(CONNECTION_STRING);
	await DB_CONNECTOR.Connect();

	APP.get('/api/test', (err, res) => {
		res.json({ message: 'hi!' });
	});

	APP.use(express.static(path.resolve(__dirname, '../dist/')));
	APP.get('*', (err, res) => {
		res.sendFile(path.resolve(__dirname, '../dist/index.html'));
	});

	APP.listen(PORT, () => {
		console.log(`Node server listening on http://localhost:${PORT}`);
	});
})();
