import request from "@/utils/request";

/**
 * 登录
 * @param {*} data 
 * @returns 
 */
export function userLogin(data) {
    return request({
        url: '/xiaomi/v2/ms/user/login',
        method: 'POST',
        data,
        isToken: false
    })
}

/**
 * 注册
 * @param {*} data 
 * @returns 
 */
export function userRegister(data) {
    return request({
        url: '/xiaomi/v2/ms/user/register',
        method: 'POST',
        data,
        isToken: false
    })
}

/**
 * 查询个人信息
 * @param {*} data 
 * @returns 
 */
export function detailUserInfo(data) {
    return request({
        url: '/xiaomi/v2/ms/user/info',
        method: 'GET',
        data,
        isToken:true
    })
}