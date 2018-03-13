var Article = require('../model/article');

/**
 * 新建文章
 * 
 * @param {any} ctx 
 * @param {any} next 
 */
const post_admin_article = async (ctx, next) => {
    const { title, content } = ctx.request.body;

    if (!title) {
        ctx.throw('article:title_empty', '博文标题不可为空')
    }

    if (!content) {
        ctx.throw('article:content_empty', '博文内容不可为空')
    }

    const createDate = Number.parseInt(new Date().getTime(), 10);

    const article = new Article({
        title,
        content,
        createDate,
        modifyDate: Number.parseInt(createDate),
        tags: [],
        status: 'edit',
        pv: 0
    });

    await article.save().then(data => {
        ctx.rest({
            id: data._id
        });
    }).catch(err => {
        ctx.throw('user:register_error', '添加文章失败')
    });
};

/**
 * 文章列表
 * 
 * @param {any} ctx 
 * @param {any} next 
 */
const get_admin_article_list = async (ctx, next) => {
    const list = await Article.find({});
    
    ctx.rest({
        limit: 0,
        current: 0,
        total: list.length,
        list
    });
};


/**
 * 获取文章
 * 
 * @param {any} ctx 
 * @param {any} next 
 */
const get_admin_article = async (ctx, next) => {
    const { id } = ctx.params;
    let article = null;

    try {
        article = await Article.findOne({ _id: id });
        ctx.rest(article);
    } catch(e) {
        ctx.throw('article:update_article_not_found', '修改文章不存在')
    }
};

/**
 * 修改文章
 * 
 * @param {any} ctx 
 * @param {any} next 
 */
const put_admin_article = async (ctx, next) => {
    const { title, content } = ctx.request.body;
    const { id } = ctx.params;
    let article = null;

    try {
        article = await Article.findOne({ _id: id });
    } catch(e) {
        ctx.throw('article:update_article_not_found', '修改文章不存在')
    }

    try {
        await Article.update({ _id: id }, {
            $set: {
                title,
                content
            },
        });
        ctx.rest();
    } catch(e) {
        ctx.throw('article:update_article_error', '修改失败')
    }
};

/**
 * 删除文章
 * 
 * @param {any} ctx 
 * @param {any} next 
 */
const delete_admin_article = async (ctx, next) => {
    const { id } = ctx.params;
    await Article.remove({ _id: id }).then((data) => {
        ctx.rest();
    }).catch(err => {
        ctx.throw('article:delete_article_error', '删除文章失败')
    });
};


/**
 * 更改文章状态
 * 
 * @param {any} ctx 
 * @param {any} next 
 */
const put_admin_article_status = async (ctx, next) => {

}

module.exports = {
    post_admin_article,
    get_admin_article_list,
    get_admin_article,
    delete_admin_article,
    put_admin_article
};