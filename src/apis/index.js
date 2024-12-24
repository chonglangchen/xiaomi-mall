import request from "@/utils/request";

/**
 * 轮播图
 * @param {*} params 
 * @returns 
 */
export function listBanner(params) {
    return request({
        url: '/xiaomi/v2/carousel',
        method: 'GET',
        params,
        isToken: false
    })
}

/**
 * 查询商品卡片
 * @param {*} params 
 * @returns 
 */
export function listHotProduct(params) {
    return request({
        url: '/xiaomi/v2/product/hot',
        method: 'GET',
        params,
        isToken: false
    })
}