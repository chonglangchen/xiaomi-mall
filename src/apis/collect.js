import request from "@/utils/request";

/**
 * 收藏-取消收藏
 * @param {*} data 
 * @returns 
 */
export function productCollect({ productId, ...data }) {
    return request({
        url: `/xiaomi/v2/collect/${productId}`,
        method: 'POST',
        data,
        isToken: true
    })
}

/**
 * 查询当前用户收藏商品信息
 * @param {*} params 
 * @returns 
 */
export function checkCollect(params) {
    return request({
        url: '/xiaomi/v2/collect',
        method: 'GET',
        params,
        isToken: true
    })
}