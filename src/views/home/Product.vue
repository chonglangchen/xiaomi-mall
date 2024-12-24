<template>
    <div>
        <el-breadcrumb class="public-width" style="padding: 10px;" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>全部商品</el-breadcrumb-item>
            <el-breadcrumb-item>分类</el-breadcrumb-item>
        </el-breadcrumb>

        <el-tabs class="public-width" type="card" v-model="activeName" @tab-click="changeTab">
            <el-tab-pane label='全部' name="0"></el-tab-pane>
            <el-tab-pane v-for="item in productClassifyList" :label=item.categoryName
                :name="String(item.categoryId)"></el-tab-pane>
        </el-tabs>

        <div style="background-color: #F5F5F5;padding: 10px;">
            <div class="product-list public-width">
                <product-card @click="toDetail" v-for="item in productList" :data="item"></product-card>
            </div>

            <el-row class="public-width padding" type="flex" justify="center">
                <el-pagination :current-page.sync="pagination.pageNum" :page-size.sync="pagination.pageSize"
                    layout="total, prev, pager, next, jumper" :total="pagination.total"
                    @current-change="getProductList()">
                </el-pagination>
            </el-row>
        </div>

    </div>
</template>
<script>
import { listProductClassify, listProduct } from '@/apis/product.js'
import productCard from '@/components/productCard.vue';
export default {
    name: "",
    components: {
        productCard
    },
    data() {
        return {
            productClassifyList: [],
            productList: [],
            activeName: "",
            pagination: {
                total: 0,
                pageNum: 1,
                pageSize: 15,
            },
            pId: undefined
        }
    },
    created() {
        this.getProductClassify()
        this.getProductList()
    },
    methods: {
        getProductClassify() {
            listProductClassify().then(res => {
                this.productClassifyList = res.data
            })
        },
        getProductList(query) {
            const { pageNum, pageSize } = this.pagination
            listProduct({
                pageNum,
                pageSize,
                ...query
            }).then(res => {
                this.pagination.total = res.total
                this.productList = res.rows
            })
        },
        changeTab() {
            this.getProductList({ categoryId: this.activeName == 0 ? undefined : this.activeName })
        },
        toDetail(pId) {
            this.$store.state.pId = pId
            this.$router.push('/detail' + '?id=' + pId)
        }
    }
}
</script>
<style lang="scss" scoped>
.product-list {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
}

.el-tabs__header {
    margin: 0;
}
</style>
