<template>
    <div class="">
        <el-row class="public-width" style="font-size: 28px;height: 80px;gap: 20px;" type="flex" justify="top"
            align="middle">
            <i style="color: #FF6700;" class="el-icon-notebook-2"></i>
            <div>我的订单</div>
        </el-row>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    name: "",
    data() {
        return {
        }
    }
}
</script>
<style lang="scss" scoped></style>
