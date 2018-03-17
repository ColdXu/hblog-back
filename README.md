## 博客rest服务

### 持续集成
[Travis CI](https://www.travis-ci.org/)

### 接口文档
|method|api    |describe               |
|----|----|----|
|`post`     |/api/user/regiser      | 注册 |
|`get`      |/api/logout            | 注销 |
|`post`     |/api/login             | 登录 |
|`post`     |/api/admin/article     | 发布文章|
|`get`      |/api/admin/article/list| 获取文章列表|
|`get`      |/api/admin/article/{id}| 获取文章|
|`delete`   |/api/admin/article/{id}| 删除文章|
|`put`      |/api/admin/article/{id}| 文章| 

#### 使用ssh行程登录服务器
ssh-copy-id aliyunzixun@xxx.com

#### 创建用户
use admin
db.createUser({user: "root", pwd: "123456", roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]})

db.auth('root', '123456')
use blog
 db.createUser({user: "db", pwd: "123456", roles: [ { role: "userAdminAnyDatabase", db: "blog" } ]})


#### 启动mongo
mongod -f /ect/mongo.conf

#### 修复mongod非正常关毕报错
mongod --db

#### 查看mogno进程
-ef | grep mongo
### 遇到的坑  
[启动service mongod start 报错](https://github.com/jingxinxin/tiankeng/issues/5)


### linux 根据名称查看进行
pgrep nginx | xargs ps -u --pid 
  
#### 服务器
- nvm
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash    
- yarm
- pm2
