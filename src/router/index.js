const home = require('../api/home');
const user = require('../api/user');
const article = require('../api/article');
const authorization = require('../middleware/authorization');
const router = require('koa-router')();
const API = '/api/';

router.get(API + 'home', authorization, home.test)

    // 注册
    .post(API + 'user/regiser', user.post_regiser)

    // 注销
    .get(API + 'logout', authorization, user.get_logout)

    // 获取用户信息
    .get(API + 'user/info', user.get_info)
    
    // 登录
    .post(API + 'login', user.post_login)

    // 创建博文
    .post(API + 'admin/article', authorization, article.post_admin_article)

    // 获取管理员博文列表
    .get(API + 'admin/article/list', authorization, article.get_admin_article_list)

    // 获取单个博文
    .get(API + 'admin/article/:id', authorization, article.get_admin_article)

    // 删除单个博文
    .delete(API + 'admin/article/:id', authorization, article.delete_admin_article)

    // 修改单个博文状态
    .put(API + 'admin/article/:id', authorization, article.put_admin_article)
    
module.exports = function () {
    return router.routes();
}