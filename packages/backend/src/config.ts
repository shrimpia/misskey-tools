import fs from 'fs';
import path from 'path';
import url from 'url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

export interface Config {
	/** Misskey Tools アプリケーションポート */
	port: number;

	/** Misskey Tools URL */
	url: string;

	/**
	 * Misskey Tools のユーザーエージェント文字列に追加するテキスト。
	 */
	uaExtra: string;

	/**
	 * Redis 設定
	 */
	redis: {
		host: string;
		port: number;
	};
}

export const config: Config = Object.freeze(JSON.parse(fs.readFileSync(__dirname + '/../../../config.json', 'utf-8')));

export const meta: MetaJson = {
  version: process.env.npm_package_version as string,
};

export type MetaJson = {
  version: string;
};
