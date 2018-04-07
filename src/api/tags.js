const Tags = require('../model/tags');
const Article = require('../model/article');
const path = require('path')

/**
 * 添加标签
 * 
 * @param {any} ctx 
 * @param {any} next 
 */
const post_tags = async (ctx, next) => {
    const { name } = ctx.request.body
    
    const tags = new Tags({
        name,
        count: 0,
    })

    try {
        const data = await tags.save();
        ctx.rest({
            id: data._id
        })
    } catch(e) {
        ctx.throw('tags:add_erorr', '标签添加失败')
    }
};

/**
 * 修改标签
 * 
 * @param {any} ctx 
 * @param {any} next 
 */
const put_tags = async (ctx, next) => {
    const { name } = ctx.request.body
    const { id } = ctx.params;
    try {
        const data = await Tags.update({ _id: id }, {
            $set: {
                name,
            },
        });

        await Article.update({tagId: id}, {
            $set: {
                tagName: name
            }
        }, false, true)

        ctx.rest()
    } catch(e) {
        ctx.throw('tags:update_erorr', '标签修改失败', e)
    }
};


/**
 * 获取标签列表
 * 
 * @param {any} ctx 
 * @param {any} next 
 */
const get_tags_list = async (ctx, next) => {
    try {
        const tags = await Tags.find({})
        ctx.rest({
            list: tags
        })
    } catch(e) {
        ctx.throw('tags:error', '获取列表错误')
    }
};

module.exports = {
    get_tags_list,
    put_tags,
    post_tags,
};