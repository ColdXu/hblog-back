const Koa = require('koa');
const app = new Koa();
const json = require('koa-json');
const mongoose = require('mongoose');
const bodyparser = require('koa-bodyparser')();
const session = require('koa-session');
const logger = require('koa-logger');
const router = require('./router');
const rest = require('./middleware/rest');
const error = require('./middleware/error');
const cors = require('koa2-cors');
mongoose.Promise = require('bluebird');

const DB_URL = 'mongodb://admin:123456@182.254.231.120:27017/hblog';
// const DB_URL = 'mongodb://127.0.0.1:27017/blog';
//；连接数据库
mongoose.connect(DB_URL, {
  useMongoClient:true
});

app.keys = ['davinci'];

app.use(cors({
  origin: function (ctx) {
    return '*'
  }
}));

// session设置
app.use(session({
    key: 'blog',
    maxAge: 86400000,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
}, app));


app.use(bodyparser);
app.use(json());
app.use(rest);
app.use(error);
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));
app.use(router());

app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.listen(8000, () => {
  console.log('http://127.0.0.1:8000已启动')
})

module.exports = app;