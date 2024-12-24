<template>
    <div class="">
        <el-row class="public-width" style="font-size: 28px;height: 80px;gap: 20px;" type="flex" justify="top"
            align="middle">
            <i style="color: #FF6700;" class="el-icon-shopping-cart-2"></i>
            <div>我的购物车</div>
            <div style="font-size: 12px;">温馨提示：商品是否购买成功，以最终下单为准哦，请尽快结算</div>
        </el-row>

        <div v-if="isEmpty" class="flex-jc-center"
            style="color: #B0B0B0;background-color: #F5F5F5;border-top: 1px solid #FF6700;">
            <el-empty class="public-width" :image="require('@/assets/img/cartEmpty.png')" description=" "
                :image-size="362"></el-empty>
            <div class="flex-direction-column flex-jc-center public-width">
                <span style="font-size: 36px;">您的购物车还是空的！</span>
                <span style="font-size: 18px;">快去购物吧！</span>
            </div>
        </div>

        <div v-else="!isEmpty" style="background-color: #F5F5F5;padding: 40px 0;">
            <el-table @selection-change="goodSelect" class="public-width" :data="cartList">
                <el-table-column type="selection" label="全选" :reserve-selection="true"></el-table-column>
                <el-table-column prop="productPicture">
                    <template slot-scope="scope">
                        <img :src="$store.getters.filePreUrl + scope.row.productPicture"
                            style="width: 80px;height: 80px" alt="">
                    </template>
                </el-table-column>
                <el-table-column prop="productName" label="商品名称"></el-table-column>
                <el-table-column prop="productSellingPrice" label="单价">
                    <template #default="{ row }">
                        {{ row.productSellingPrice }}元
                    </template>
                </el-table-column>
                <el-table-column label="数量">
                    <template #default="{ row }">
                        <el-input-number @change="changeNum(row)" :min="1" v-model="row.num"></el-input-number>
                    </template>
                </el-table-column>
                <el-table-column prop="productSellingPrice num" label="小计">
                    <template #default="{ row }">
                        {{ subTotal(row.productSellingPrice, row.num) }}元
                    </template>
                </el-table-column>
                <el-table-column @click="" label="操作">
                    <template #default="{ row }">
                        <el-popconfirm title="是否删除" @confirm="handleDelete(row)">
                            <template #reference>
                                <i class="el-icon-error"></i>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>

            <div style="height: 48px;margin-top: 20px;" class="flex public-width">
                <div class="flex-jc-sb flex-ai-center h100 bottom-row">
                    <div class="flex" style="gap: 10px;">
                        <span @click="$router.push('/home/index')">继续购物</span>
                        <span>|</span>
                        <span>共 <span style="color: #FF6700;">{{ cartList.length }}</span> 件商品，已选择 <span
                                style="color: #FF6700;">{{
                                    hasSelected }}</span> 件</span>
                    </div>
                    <div>
                        <span style="color: #FF6700;">合计：<span style="font-size: 32px;">{{ totalMoney }}元</span></span>
                    </div>
                </div>
                <div class="h100 flex-jc-center flex-ai-center"
                    :class="{ 'default-btn': !totalMoney, 'active-btn': totalMoney }"
                    @click="toOrder">去结算
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { inquireShoppingCart, deleteShoppingCart, changeProductNum, inquireProductNum } from '@/apis/shoppingCart.js'

export default {
    name: "",
    data() {
        return {
            isEmpty: true,
            cartList: [],
            hasSelected: 0,
            totalMoney: 0,
            select:[]
        }
    },
    computed: {
        // totalMoney() {
        //     return this.cartList.reduce((pre, cur) => {
        //         return pre + cur.productSellingPrice * cur.num
        //     }, 0)
        // }
    },
    created() {
        this.inquireCart()
    },
    methods: {
        inquireCart() {
            inquireShoppingCart().then(res => {
                
                if (res.code == 200) {
                    this.cartList = res.data
                    this.isEmpty = this.cartList.length ? false : true
                    
                }
            })
        },
        subTotal(price, num) {
            return price * num
        },
        handleDelete({ shoppingCartId }) {
            deleteShoppingCart({ shoppingCartId }).then(res => {
                this.$message({
                    type: res.code == 200 ? 'success' : 'error',
                    message: res.msg
                })
                if (res.code == 200) this.inquireCart()
            })
        },
        changeNum(rowData) {
            const { num, shoppingCartId } = rowData
            changeProductNum({ num, shoppingCartId }).then(res => {
                this.goodSelect(this.select)

            })
        },
        goodSelect(select) {
            this.totalMoney = select.reduce((pre, cur) => {
                return pre + cur.productSellingPrice * cur.num
            }, 0)

            this.select = select

            this.hasSelected = select.length
        },
        toOrder(){
            // totalMoney ? $router.push('/order') : ''
            if(this.totalMoney){
                this.$router.push({
                    path:'/order/createOrder',
                    query:{
                        shoppingCartArray:JSON.stringify(this.select)
                    }
                })
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.bottom-row {
    background-color: white;
    padding: 20px;
    box-sizing: border-box;
    flex: 1;

}

.default-btn {
    width: 200px;
    background-color: #E0E0E0;
    color: #909399;
    font-size: 20px;
}

.active-btn {
    width: 200px;
    background-color: #FF6700;
    color: #fff;
    font-size: 20px;
}
</style>
