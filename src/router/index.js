const home = require('../api/home');
const user = require('../api/user');
const article = require('../api/article');
const media = require('../api/media');
const tags = require('../api/tags');
const authorization = require('../middleware/authorization');
const router = require('koa-router')();
const API = '/api/';

router.get(API + 'home', authorization, home.test)

    /**
     * 用户
     * 
     * @param {any} ctx 
     * @param {any} next 
     */
    // 注册
    .post(API + 'user/regiser', user.post_regiser)

    // 注销
    .get(API + 'logout', authorization, user.get_logout)

    // 获取用户信息
    .get(API + 'user/info', user.get_info)

    // 获取站点信息
    .get(API + 'user/sizeInfo/:username', user.get_site_info)
    
    // 登录
    .post(API + 'login', user.post_login)


    /**
     * 文章
     * 
     * @param {any} ctx 
     * @param {any} next 
     */

    // 创建博文
    .post(API + 'admin/article', authorization, article.post_admin_article)

    // 获取管理员博文列表
    .get(API + 'admin/article/list', authorization, article.get_admin_article_list)

    // 获取管理员单个博文
    .get(API + 'admin/article/:id', authorization, article.get_admin_article)

    // 删除单个博文
    .delete(API + 'admin/article/:id', authorization, article.delete_admin_article)

    // 修改单个博文
    .put(API + 'admin/article/:id', authorization, article.put_admin_article)

    // 修改博文状态
    .put(API + 'admin/article/:id/:status', authorization, article.put_admin_article_status)

    // 获取列表
    .get(API + 'article/list', article.get_article_list)

    // 获取单个博文
    .get(API + 'article/:id', article.get_article)


    /**
     * 媒体
     * 
     * @param {any} ctx 
     * @param {any} next 
     */
    // 上传媒体文件 
    .post(API + 'media', authorization, media.post_media)

    // 获取媒体文件
    .get(API + 'media/:id', media.get_media)



    /**
     * 标签
     * 
     * @param {any} ctx 
     * @param {any} next 
     */
    // 添加标签
    .post(API + 'admin/tags', authorization, tags.post_tags)

     // 修改标签
    .put(API + 'admin/tags/:id', authorization, tags.put_tags)

    // 获取标签列表
    .get(API + 'tags/list', tags.get_tags_list)

   

    
module.exports = function () {
    return router.routes();
}