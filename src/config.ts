import fs from 'fs';

export const config = Object.freeze(JSON.parse(fs.readFileSync(__dirname + '/../config.json', 'utf-8')));
