import Koa from 'koa';
import bodyParser from 'koa-bodyparser';

import { router } from './router';
import constant from './const';
import { render } from './render';
import serve from 'koa-static';
import mount from 'koa-mount';
import { config } from './config';

const app = new Koa();

console.log('Misshaialert v' + constant.version);

app.use(bodyParser());
app.use(render);
app.use(mount('/assets', serve(__dirname + '/assets')));
app.use(router.routes());

console.log(`listening port ${config.port}...`);

console.log('App launched!');

app.listen(config.port || 3000);