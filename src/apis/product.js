import request from "@/utils/request";

/**
 * 查询商品分类列表
 * @param {*} params 
 * @returns 
 */
export function listProductClassify(params) {
    return request({
        url: '/xiaomi/v2/category',
        method: 'GET',
        params,
        isToken: false
    })
}

/**
 * 查询商品列表
 * @param {*} params 
 * @returns 
 */
export function listProduct(params) {
    return request({
        url: '/xiaomi/v2/product',
        method: 'GET',
        params,
        isToken: false
    })
}

/**
 * 查询商品详情
 * @param {*} params 
 * @returns 
 */
export function listProductDetail({ productId, ...params }) {
    return request({
        url: `/xiaomi/v2/product/${productId}`,
        method: 'GET',
        params,
        isToken: false
    })
}