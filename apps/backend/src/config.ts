import fs from 'fs';
import path from 'path';
import url from 'url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

export const config = Object.freeze(JSON.parse(fs.readFileSync(__dirname + '/../../../config.json', 'utf-8')));

export const meta: MetaJson = {
  version: process.env.npm_package_version as string,
};

export type MetaJson = {
  version: string;
};
