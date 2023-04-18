import 'reflect-metadata';

import { config, meta } from '@/config.js';
import { startServer } from '@/server/index.js';

export default (): void => {
	console.log(`** Misskey Tools ${meta.version} **`);
	console.log('(C) Shrimpia Network');
	startServer().then(() => {
		console.log('GET READY!');
		console.log(`Server URL >> ${config.url}`);
	});
};
