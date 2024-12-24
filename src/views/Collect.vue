<template>
    <div class="">
        <el-row class="public-width" style="font-size: 28px;height: 80px; gap: 20px;" type="flex" justify="top" align="middle">
            <i style="color: #FF6700;" class="el-icon-collection-tag"></i>
            <div>我的收藏</div>
        </el-row>

        <div v-if="isEmpty" class="flex-jc-center"
            style="color: #B0B0B0;background-color: #F5F5F5;border-top: 1px solid #FF6700;">
            <el-empty class="public-width" :image="require('@/assets/img/collectEmpty.png')" description=" "
                :image-size="362"></el-empty>
            <div class="flex-direction-column flex-jc-center public-width">
                <span style="font-size: 36px;">您的收藏还是空的！</span>
                <span style="font-size: 18px;">快去购物吧！</span>
            </div>
        </div>

        <div v-else="!isEmpty" style="background-color: #F5F5F5;">
            <div class="public-width flex" style="padding: 20px 0;gap: 10px;">
                <product-card v-for="item in collectList" :data="item" @click="toDetail"></product-card>
            </div>
        </div>
    </div>
</template>
<script>
import { checkCollect } from '@/apis/collect.js'
import productCard from '@/components/productCard.vue';

export default {
    name: "",
    components: {
        productCard
    },
    data() {
        return {
            collectList: [],
            isEmpty: true
        }
    },
    created() {
        this.checkProductCollect()
    },
    methods: {
        checkProductCollect() {
            checkCollect().then(res => {
                this.collectList = res.data
                // if (this.collectList.length) {
                //     this.isEmpty = false
                // } else {
                //     this.isEmpty = true
                // }
                if (res.code == 200) {
                    this.isEmpty = this.collectList.length ? false : true
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
<style lang="scss" scoped></style>
