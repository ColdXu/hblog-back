const Koa = require('koa');
const app = new Koa();
const json = require('koa-json');
const mongoose = require('mongoose');
const bodyparser = require('koa-body');
const session = require('koa-session');
const logger = require('koa-logger');
const router = require('./router');
const rest = require('./middleware/rest');
const mediaRest = require('./middleware/media-rest');
const error = require('./middleware/error');
const cors = require('koa2-cors');
mongoose.Promise = require('bluebird');

const DB_URL = 'mongodb://admin:123456@db.coldxu.com/hblog';
//；连接数据库
mongoose.connect(DB_URL, {
  useMongoClient:true
});

app.keys = ['davinci'];

app.use(cors({
  credentials: true,
}));

// session设置
app.use(session({
    key: 'blog',
    maxAge: 86400000 * 365,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
}, app));


app.use(bodyparser(
  {
    multipart: true,
    formidable: {
      maxFileSize: 200*1024*1024 // 设置上传文件大小最大限制，默认2M
    }
  }
));
app.use(json());
app.use(rest);
app.use(mediaRest);
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
  console.log('服务已启用 8000已启动')
})

module.exports = app;