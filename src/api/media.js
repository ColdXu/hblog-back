var Media = require('../model/media');
var path = require('path')
var fs = require('fs');

/**
 * 上传媒体文件 
 * 
 * @param {any} ctx 
 * @param {any} next 
 */
const post_media = async (ctx, next) => {
    const { files, type } = ctx.request.body;
    const file = files.file;
    const newPath = '/data/media/' + new Date().getTime() + '.' + file.type.split('/')[1];

    fs.rename(file.path, newPath);

    const media = new Media({
        filename: file.name,
        path: newPath,
        mediaType: file.type,
        type,
        createDate: Number.parseInt(new Date().getTime(), 10)
    });
    try {
        const data = await media.save();
        ctx.rest({
            id: data._id
        });
    } catch(e) {
        ctx.throw('media:upload_error', '图片上传失败')
    }
};


/**
 * 获取媒体文件 
 * 
 * @param {any} ctx 
 * @param {any} next 
 */
const get_media = async (ctx, next) => {
    const { id } = ctx.params;
    try {
        const data = await Media.findOne({_id: id})
        const file = fs.readFileSync(data.path)
        ctx.mediaRest({
            type: data.mediaType,
            data: file,
        })
    } catch(e) {
        ctx.throw('media:not_find', '图片未找到')
    }
};

module.exports = {
    post_media,
    get_media,
};