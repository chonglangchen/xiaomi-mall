<template>
    <div class="">
        <div v-if="orderList.length == 0" class="flex-jc-center"
            style="color: #B0B0B0;background-color: #F5F5F5;border-top: 1px solid #FF6700;">
            <el-empty class="public-width" :image="require('@/assets/img/orderEmpty.png')" description=" "
                :image-size="362"></el-empty>
            <div class="flex-direction-column flex-jc-center public-width">
                <span style="font-size: 36px;">您的购物车还是空的！</span>
                <span style="font-size: 18px;">快去购物吧！</span>
            </div>
        </div>

        <div v-else class="flex-direction-column"
            style="background-color: #F5F5F5;gap: 20px;padding: 20px 0;box-sizing: border-box;">
            <div v-for="item in orderList" v-if="item['products']" class="public-width"
                style="background-color: white;">
                <div class="flex-jc-sb"
                    style="border-bottom: 1px solid #FF6700;padding: 0 20px;box-sizing: border-box;">
                    <h4 style="color: #FF6700;">订单编号:{{ item.orderNum }}</h4>
                    <h4>订单时间:{{ item.orderTime }}</h4>
                </div>
                <el-table :data="item.products">
                    <el-table-column prop="productPicture">
                        <template slot-scope="scope">
                            <img :src="$store.getters.filePreUrl + scope.row.productPicture"
                                style="width: 90px;height: 90px" alt="">
                        </template>
                    </el-table-column>
                    <el-table-column prop="productName" label="商品名称"></el-table-column>
                    <el-table-column prop="productSellingPrice" label="单价"></el-table-column>
                    <el-table-column prop="num" label="数量"></el-table-column>
                    <el-table-column label="小计">
                        <template #default="{ row }">
                            <span style="color: #FF6700;">
                                {{ calculateTotal(row) }}元
                            </span>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="flex-jc-sb flex-ai-center""
                    style=" border-top: 1px solid #FF6700;padding: 0 20px;margin:0;box-sizing: border-box;">
                    <h4>共 <span style="color: #FF6700;">{{ item.products.length }}</span> 件商品</h4>
                    <h4 class="flex-ai-center" style="color: #FF6700;">合计:<h2 style="margin: 0;">{{ totalMoney(item) }}元
                        </h2>
                    </h4>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { inquireOrder } from '@/apis/order';


export default {
    name: "",
    data() {
        return {
            orderList: [],
        }
    },
    created() {
        this.inquireUserOrder()
    },
    methods: {
        inquireUserOrder() {
            inquireOrder().then(res => {
                // console.log(res);
                this.orderList = res.data
            })
        },
        calculateTotal(rowData) {
            // this.totalMoneyList.push(rowData.num * rowData.productSellingPrice)
            // console.log(this.totalMoneyList);

            return rowData.num * rowData.productSellingPrice
        },
        totalMoney(item) {
            return item.products.reduce((prev, cur) => {
                return prev + cur.num * cur.productSellingPrice
            }, 0)
        }
    }
}
</script>
<style lang="scss" scoped></style>
