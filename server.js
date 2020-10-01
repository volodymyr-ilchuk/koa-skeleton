require('dotenv').config();

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const mount = require('koa-mount');
const path = require('path');

require('./database-connection.js');

const app = new Koa();
app.use(bodyParser());

app.use(require('./middlewares/error-handler'));

app.use(require('./routes/auth.js'));
app.use(require('./routes/swagger.js'));

if (process.env.NODE_ENV === 'development') {
  app.use(mount('/uploads', serve(path.join(process.cwd(), '/static/uploads'), { defer: true })));
}
if (process.env.NODE_ENV !== 'production') {
  app.use(mount('/docs', serve(path.join(process.cwd(), '/static/docs'), { defer: true })));
}

app.listen(process.env.NODE_PORT);
