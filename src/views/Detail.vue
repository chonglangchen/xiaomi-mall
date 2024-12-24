<template>
    <div class="">
        <div class="item-column">
            <div class="content public-width h100 flex-jc-sb flex-ai-center">
                <div class="left">{{ productData.productName }}</div>
                <div class="right flex">
                    <div>概述</div>
                    <div>参数</div>
                    <div>用户评价</div>
                </div>
            </div>
        </div>
        <div class="detail-container">
            <div class="content public-width flex-jc-sb">
                <div class="left flex-direction-column flex-ai-center">
                    <el-carousel style="width: 520px;" height="518px" indicator-position="outside">
                        <el-carousel-item v-for="item in picList" :key="item.pictureId">
                            <img class="w100 h100" :src="$store.getters.filePreUrl + item.productPicture" alt="">
                        </el-carousel-item>
                    </el-carousel>
                </div>
                <div class="right flex-direction-column">
                    <div class="detail">
                        <div class="top">{{ productData.productName }}</div>
                        <div class="center">{{ productData.productIntro }}</div>
                        <div class="end">小米自营</div>
                    </div>
                    <div class="price">
                        <span style="color: #FF6700;">{{ productData.productSellingPrice }}元</span>
                        <span style="color: #B0B0B0;text-decoration: line-through;">{{ productData.productPrice
                            }}元</span>
                    </div>
                    <div class="others">
                        <div class="buy-row">
                            <div class="info">
                                <div class="top flex-jc-sb">
                                    <div>{{ productData.productName }}</div>
                                    <div>
                                        <span>{{ productData.productSellingPrice }}元</span>
                                        <span style="text-decoration: line-through;">{{ productData.productPrice
                                            }}元</span>
                                    </div>
                                </div>
                                <div class="end">总计：{{ productData.productSellingPrice }}元</div>
                            </div>
                            <div class="flex-jc-sb">
                                <div class="buy" @click="shoppingCart">加入购物车</div>
                                <el-button style="width: 260px;height: 56px;" type="info" @click="addCollect">喜欢</el-button>
                            </div>
                        </div>
                        <div class="feature">
                            <span>√小米自营</span>
                            <span>√小米发货</span>
                            <span>√7天无理由退货</span>
                            <span>√7天无理由退货</span>
                            <span>√7天价格保护</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { listProductDetail } from '@/apis/product';
import { addShoppingCart } from '@/apis/shoppingCart';
import { productCollect } from '@/apis/collect.js'

export default {
    name: "",
    data() {
        return {
            picList: [],
            productId: undefined,
            productData: {}
        }
    },
    created() {
        this.productDetail()
    },
    methods: {
        productDetail() {
            this.productId = this.$store.state.pId || this.$route.query.id
            listProductDetail({ productId: this.productId }).then(res => {
                this.picList = res.data.pictures
                this.productData = res.data
            })
        },
        shoppingCart() {
            addShoppingCart({ productId: this.productId }).then(res => {
                if (res.code == 200) {
                    this.$message.success(res.msg)
                    this.$store.dispatch('getShopCartNum')
                } else {
                    this.$message.error(res.msg)
                }
            })
        },
        addCollect() {
            productCollect({ productId: this.productId }).then(res => {
                if (res.code == 200) {
                    this.$message.success(res.msg)
                } else {
                    this.$message.error(res.msg)
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.item-column {
    height: 62px;
    box-shadow: 0 5px 5px rgba(145, 139, 139, 0.25);
    margin-bottom: 20px;

}

.item-column .content .left {
    font-size: 18px;
}

.item-column .content .right {
    gap: 20px;
}

.detail-container {
    padding-bottom: 40px;
}

.detail-container .content .left {
    gap: 20px;
}

.detail-container .content .left .window {
    width: 520px;
    height: 518px;
    overflow: hidden;
    position: relative;
}

.detail-container .content .left .window:hover .prev {
    left: 20px;
    opacity: 1;
}

.detail-container .content .left .window:hover .next {
    right: 20px;
    opacity: 1;
}

.detail-container .content .left .window .prev {
    position: absolute;
    top: 50%;
    left: -3%;
    transform: translateY(-50%);
    cursor: pointer;
    transition: 0.3s;
    opacity: 0;
}

.detail-container .content .left .window .next {
    position: absolute;
    top: 50%;
    right: -3%;
    transform: translateY(-50%);
    cursor: pointer;
    transition: 0.3s;
    opacity: 0;
}

.detail-container .content .left .window .train {
    width: fit-content;
    height: 100%;
}

.detail-container .content .left .window .train img {
    width: 520px;
    height: 518px;
}

.detail-container .content .left .line-row {
    gap: 5px;
}

.detail-container .content .left .line-row .line {
    width: 30px;
    height: 2px;
    background-color: #DCDFE6;
    cursor: pointer;
}

.detail-container .content .left .line-row .line.active {
    background-color: #B0B0B0;
}

.detail-container .content .right {
    width: 642px;
    gap: 20px;
}

.detail-container .content .right .detail div {
    padding: 5px 0;
}

.detail-container .content .right .detail .top {
    font-size: 24px;
}

.detail-container .content .right .detail .center {
    color: #B0B0B0;
}

.detail-container .content .right .detail .end {
    color: #FF6700;
}

.detail-container .content .right .others {
    border-top: 1px #E0E0E0 solid;
}

.detail-container .content .right .others .buy-row .info {
    height: 136px;
    background-color: #F9F9FA;
    margin-top: 40px;
    margin-bottom: 40px;
}

.detail-container .content .right .others .buy-row .info .top {
    color: #606266;
    padding: 25px 65px;
}

.detail-container .content .right .others .buy-row .info .end {
    color: #FF6700;
    padding: 12px 70px;
    font-size: 24px;
}

.detail-container .content .right .others .buy-row .buy {
    width: 340px;
    height: 56px;
    background-color: #FF6700;
    color: white;
    line-height: 56px;
    text-align: center;
    border-radius: 4px;
    margin-bottom: 15px;
}

.detail-container .content .right .others .feature span {
    padding: 0 5px;
    color: #B0B0B0;
}
</style>
