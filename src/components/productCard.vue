<template>
    <div class="card flex-jc-sb flex-ai-center" @click="$emit('click',data.productId)">
        <img style="width: 160px;height: 160px;" :src="$store.getters.filePreUrl + data.productPicture" alt="">
        <div style="font-size: 14px;">{{ data.productName }}</div>
        <div style="font-size: 12px;color: #B0B0B0;">{{ data.productTitle }}</div>
        <div>
            <span style="color: #FF6700;">{{ data.productSellingPrice }}元</span>
            <span style="text-decoration: line-through;color: #B0B0B0;">{{ data.productPrice }}元</span>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        data: {
            type: Object,
            default: () => ({})
        },
    },
}
</script>
<style lang="scss" scoped>
.card {
    width: 232px;
    height: 300px;
    flex-direction: column;
    padding: 10px 0 30px;
    box-sizing: border-box;
    background-color: white;
}
</style>
