import request from "@/utils/request";

/**
 * 添加购物车商品
 * @param {*} data 
 * @returns 
 */
export function addShoppingCart(data) {
    return request({
        url: '/xiaomi/v2/shoppingCart',
        method: 'POST',
        data,
        isToken: true
    })
}

/**
 * 查询当前用户购物车
 * @param {*} params 
 * @returns 
 */
export function inquireShoppingCart(params) {
    return request({
        url: '/xiaomi/v2/shoppingCart',
        method: 'GET',
        params,
        isToken: true
    })
}

/**
 * 删除购物车商品
 * @param {*} params 
 * @returns 
 */
export function deleteShoppingCart({ shoppingCartId, ...params }) {
    return request({
        url: `/xiaomi/v2/shoppingCart/${shoppingCartId}`,
        method: 'DELETE',
        params,
        isToken: true
    })
}

/**
 * 修改购物车商品数量
 * @param {*} data 
 * @returns 
 */
export function changeProductNum(data) {
    return request({
        url: '/xiaomi/v2/shoppingCart/product/num',
        method: 'PUT',
        data,
        isToken: true
    })
}

/**
 * 查询当前用户购物车商品数量
 * @param {*} params 
 * @returns 
 */
export function inquireProductNum(params) {
    return request({
        url: '/xiaomi/v2/shoppingCart/product/count',
        method: 'GET',
        params,
        isToken: true
    })
}