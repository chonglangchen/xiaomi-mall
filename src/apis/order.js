import request from "@/utils/request";

/**
 * 生成订单
 * @returns data
 */
export function createOrder(data) {
    return request({
        url: '/xiaomi/v2/orders/create',
        method: 'POST',
        data,
        isToken: true
    })
}

/**
 * 查询订单
 * @returns params
 */
export function inquireOrder(params) {
    return request({
        url: '/xiaomi/v2/orders',
        method: 'GET',
        params,
        isToken: true
    })
}