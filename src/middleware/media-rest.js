// rest统一媒体文件
module.exports = async (ctx, next) => {
    ctx.mediaRest = (data) => {
        ctx.response.type = data.type;
        ctx.response.body = data.data;
    }
    await next();
}