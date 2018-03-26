var Article = require('../model/article');
var { articleStatus } = require('../public/config');
const statusArr = [articleStatus.EDIT, articleStatus.PUBLISH];


/**
 * 文章列表
 * 
 * @param {any} ctx 
 * @param {any} next 
 */
const get_article_list = async (ctx, next) => {
    const list = await Article.find({status: 'publish'});
    ctx.rest({
        limit: 0,
        current: 0,
        total: list.length,
        list
    });
};


/**
 * 新建文章
 * 
 * @param {any} ctx 
 * @param {any} next 
 */
const post_admin_article = async (ctx, next) => {
    const { title, content, status } = ctx.request.body;

    if (!title) {
        ctx.throw('article:title_empty', '博文标题不可为空')
    }

    if (!content) {
        ctx.throw('article:content_empty', '博文内容不可为空')
    }

    const createDate = Number.parseInt(new Date().getTime(), 10);

    const data = {
        title,
        content,
        createDate,
        modifyDate: createDate,
        tags: [],
        status: articleStatus.EDIT,
        pv: 0
    }

    if (status === 'publish') {
        data.publishDate = createDate;
    }

    const article = new Article(data);

    await article.save().then(data => {
        ctx.rest({
            id: data._id
        });
    }).catch(err => {
        ctx.throw('user:register_error', '添加文章失败')
    });
};

/**
 * 获取管理员文章列表
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
        ctx.throw('article:update_article_not_found', '文章不存在')
    }
};

/**
 * 获取文章
 * 
 * @param {any} ctx 
 * @param {any} next 
 */
const get_article = async (ctx, next) => {
    const { id } = ctx.params;
    let article = await Article.findOne({ _id: id });

    if (!article) {
        ctx.throw('article:update_article_not_found', '文章不存在')
    }

    if (article.status !== 'publish') {
        ctx.throw('article:update_article_not_publish', '文章未发布')
    }

    article.pv += 1;

    await Article.update({_id: id}, {$set: {pv: article.pv}})

    ctx.rest(article);
};

/**
 * 修改文章
 * 
 * @param {any} ctx 
 * @param {any} next 
 */
const put_admin_article = async (ctx, next) => {
    const { title, content, status } = ctx.request.body;
    const { id } = ctx.params;
    let article = null;
    let date = Number.parseInt(new Date().getTime(), 10);
    let updateData = {
        title,
        content,
        modifyDate: date,
    }

    try {
        article = await Article.findOne({ _id: id });
    } catch(e) {
        ctx.throw('article:update_article_not_found', '修改文章不存在')
    }

    if (status) {
        if (statusArr.indexOf(status) == -1) {
            ctx.throw('article:article_status_error', 'status 参数错误')
        } else {
            updateData.status = status;
            if (article.status === 'edit' && status === 'publish') {
                updateData.lastPublishDate = date;
                if (!article.publishDate) {
                    updateData.publishDate = date;
                }
            }
        }
    }

    try {
        await Article.update({ _id: id }, {
            $set: updateData,
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
    const { id, status } = ctx.params;
    const date = Number.parseInt(new Date().getTime(), 10);
    let article = null;
    const data = {
        status
    }

    try {
        article = await Article.findOne({ _id: id });
    } catch(e) {
        ctx.throw('article:update_article_not_found', '修改文章不存在')
    }
    
    if (statusArr.indexOf(status) == -1) {
        ctx.throw('article:article_status_error', 'status 参数错误')
    } else {
        data.lastPublishDate = date;
        if (!article.publishDate) {
            data.publishDate = date;
        }
    }
    
    try {
        await Article.update({_id: id}, {
            $set: data,
        });
        ctx.rest();
    } catch(e) {
        ctx.throw('article:article_error', '更新错误')
    }
    
}

module.exports = {
    post_admin_article,
    get_admin_article_list,
    get_admin_article,
    get_article,
    delete_admin_article,
    put_admin_article,
    put_admin_article_status,
    get_article_list,
};