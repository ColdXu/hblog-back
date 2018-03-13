var User = require('../model/user');

/**
 * 注册
 * 
 * @param {any} ctx 
 * @param {any} next 
 */
const post_regiser = async (ctx, next) => {

    const { username, password, nickname, headImg = '' } = ctx.request.body;
    console.log(username, password, nickname)

    if (!username || !password) {
        return ctx.throw('user:registered', '用户名或密码不可为空');
    }

    const userData = await User.findOne({ username });

    if (userData) {
        return ctx.throw('user:registered', '账号已注册');
    }

    const user = new User({
        username,
        password,
        nickname,
        headImg,
        rule: ['admin'],
        createDate: new Date().getTime()
    });

    await user.save().then(data => {
        ctx.rest();
    }).catch(err => {
        console.log(err)
        ctx.throw('user:register_error', '注册失败')
    });
};

/**
 * 登录
 * 
 * @param {any} ctx 
 * @param {any} next 
 */
const post_login = async (ctx, next) => {
    const { username, password } = ctx.request.body;

    if (!username || !password) {
        return ctx.throw('user:registered', '用户名或密码不可为空');
    }

    const user = await User.findOne({ username });
    
    if (!user) {
        return ctx.throw('user:not_registered', '用户名不存在');
    }

    if (user.password !== password) {
        return ctx.throw('user:password_error', '密码错误');
    }

    ctx.session.user = user;

    ctx.rest(user);
    
};

/**
 * 注销
 * 
 * @param {any} ctx 
 * @param {any} next 
 */
const get_logout = async (ctx, next) => {
    delete ctx.session.user;
    ctx.rest();
}

/**
 * 获取用户信息
 * 
 * @param {any} ctx 
 * @param {any} next 
 */
const get_info = async (ctx, next) => {
    const sessionUser = ctx.session.user;

    console.log('sessionUser', ctx.session)
    if (!sessionUser) {
        return ctx.throw('user:not_authorization', '用户未登录');
    }
    const user = await User.findOne({ username: sessionUser.username });

    if (!user) {
        return ctx.throw('user:not_user', '数据获取失败');
    }
    
    ctx.rest(user);
    
};


module.exports = {
    post_regiser,
    post_login,
    get_logout,
    get_info
};