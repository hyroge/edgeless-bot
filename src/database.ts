import fs from 'fs';
import {PATH_DATABASE} from './const';

function readDatabase(): any {
	const dst = PATH_DATABASE;
	if (!fs.existsSync(dst)) {
		return {};
	}

	return JSON.parse(fs.readFileSync(dst).toString());
}

function saveDatabase(json: any) {
	const dst = PATH_DATABASE;
	if (fs.existsSync(dst)) {
		if (fs.existsSync(dst + '.bak')) {
			fs.rmSync(dst + '.bak');
		}

		fs.renameSync(dst, dst + '.bak');
	}

	fs.writeFileSync(dst, JSON.stringify(json, null, 2));
}

export {
	readDatabase,
	saveDatabase,
};
