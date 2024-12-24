import request from "@/utils/request";

/**
 * 查询当前用户地址信息
 * @param {*} params 
 * @returns 
 */
export function inquireAddress(params) {
    return request({
        url: '/xiaomi/v2/address/list',
        method: 'GET',
        params,
        isToken: true
    })
}

/**
 * 查询区域
 * @param {*} params 
 * @returns 
 */
export function inquireArea({ pid, ...params }) {
    return request({
        url: `/xiaomi/v2/area/${pid}`,
        method: 'GET',
        params,
        isToken: true
    })
}

/**
 * 添加收货地址
 * @param {*} data 
 * @returns 
 */
export function addAddress(data) {
    return request({
        url: '/xiaomi/v2/address',
        method: 'POST',
        data,
        isToken: true
    })
}