import path from 'path';
import url from 'url';
import fs from 'fs';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

export const config = Object.freeze(JSON.parse(fs.readFileSync(__dirname + '/../config.json', 'utf-8')));

export const meta: MetaJson = Object.freeze(JSON.parse(fs.readFileSync(__dirname + '/meta.json', 'utf-8')));

export type MetaJson = {
  version: string;
};
