<template>
    <div>
        <template>
            <el-carousel class="public-width" height="456px" indicator-position="outside">
                <el-carousel-item v-for="item in bannerList">
                    <img class="w100 h100" :src="$store.getters.filePreUrl + item.url" alt="">
                </el-carousel-item>
            </el-carousel>
        </template>
        <div class="product-panel" style="background-color: #F5F5F5;">
            <div class="product-container public-width" v-for="item in productList">
                <div class="content h100">
                    <h2 style="margin: 0;padding: 20px 0;">{{ item.categoryName }}</h2>
                    <div class="flex-jc-sb">
                        <div class="left">
                            <img class="card" :class="{ long: !item.categoryPicture2 }"
                                :src="$store.getters.filePreUrl + item.categoryPicture1">
                            <img class="card" v-show="item.categoryPicture2"
                                :src="$store.getters.filePreUrl + item.categoryPicture2">
                        </div>
                        <div class="right">
                            <product-card v-for="i in item.products" :data="i" @click="toDetail"></product-card>
                            <div class="card flex-jc-center flex-ai-center">浏览更多>></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { listBanner, listHotProduct } from '@/apis';
import ProductCard from '@/components/productCard.vue';
export default {
    name: "",
    components: {
        ProductCard
    },
    data() {
        return {
            bannerList: [],
            productList: []
        }
    },
    created() {
        this.buildBanner()
        this.buildProduct()
    },
    methods: {
        buildBanner() {
            listBanner().then(res => {
                this.bannerList = res.data
                
            })
        },
        buildProduct() {
            listHotProduct().then(res => {
                if (res.code == 200) {
                    this.productList = res.rows
                }
            })
        },
        toDetail(pId) {
            this.$store.state.pId = pId
            this.$router.push('/detail'+'?id='+pId)
        }
    }
}
</script>
<style lang="scss" scoped>
.el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}

.product-container .content .card {
    width: 232px;
    height: 300px;
    background-color: white;
}

.product-container .content .left {
    width: 232px;
}

.product-container .content .left .long {
    width: 232px;
    height: 614px;
}

.product-container .content .right {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
}
</style>
