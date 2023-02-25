import {readFileSync, writeFileSync} from 'fs';

const { version } = JSON.parse(readFileSync('./package.json', {
  encoding: 'UTF-8',
  flag: 'r',
}));

writeFileSync('built/meta.json', JSON.stringify({ version }));
