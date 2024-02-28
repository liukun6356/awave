import request from '@/utils/request';

export function getPlayer() {
    return request({
        url: `/player`,
        method: 'get',
    });
}

// 注册
export function registerSingUp(data) {
    return request({
        url: `/signUp`,
        method: 'post',
        data
    });
}

// 登录
export function loginApi(data) {
    return request({
        url: `/user/login`,
        method: 'post',
        data
    });
}

// 获取验证码
export function getVcode(data) {
    return request({
        url: `/user/getVcode`,
        method: 'post',
        data
    });
}

// 注册
export function registerApi(data) {
    return request({
        url: `/user/register`,
        method: 'post',
        data
    });
}

// 获取名字
export function getNameccc(params) {
    return request({
        url: `/user/getName`,
        method: 'get',
        params
    });
}

// 修改密码
export function updateMpwd(data) {
    return request({
        url: `/user/mpwd`,
        method: 'post',
        data
    });
}

// 获取账号
export function getUserCode() {
    return request({
        url: '/user/getUserCode',
        method: 'get'
    })
}

export function getbanner(data) {
    return request({
        url: "/banner/page",
        method: "post",
        data,
    });
}

export function addMsg(data) {
    return request({
        url: "/add/msg",
        method: "post",
        data,
    });
}
