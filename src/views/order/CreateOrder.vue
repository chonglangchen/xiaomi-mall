<template>
    <div class="">

        <div style="background-color: #F5F5F5;padding: 20px;">
            <div class="public-width" style="background-color: white;padding: 50px;box-sizing: border-box;">
                <h3>收货地址</h3>
                <div class="addressArea" style="gap: 20px;">
                    <div @click="chooseAddress(item, index)" class="flex-direction-column common"
                        v-for="(item, index) in addressList" :class="{ active: curIndex == index }">
                        <div>{{ item.name }}</div>
                        <div>{{ item.phone }}</div>
                        <div>{{ item.area }}</div>
                        <div>{{ item.addressDtl }}</div>
                    </div>
                    <img @click="dialogVisible = true" src="@/assets/img/addAddress.png" alt="">
                </div>
                <h3>商品及优惠券</h3>
                <div class="product">
                    <div class="flex-jc-sb border-top" v-for="item in productList">
                        <div class="flex-ai-center">
                            <img :src="$store.getters.filePreUrl + item.productPicture" style="width: 36px;height: 36px"
                                alt="">
                            <span>{{ item.productName }}</span>
                        </div>
                        <div style="color: #FF6700;">{{ item.productSellingPrice }}元</div>
                    </div>
                    <div style="display: grid;grid-template-columns: 1fr 6fr;line-height: 80px;">
                        <span class="border-top">配送方式</span>
                        <span class="border-top" style="color: #FF6700;">包邮</span>
                        <span class="border-top">发票</span>
                        <div class="border-top flex" style="gap: 10px;color: #FF6700;">
                            <span>电子发票</span>
                            <span>个人</span>
                            <span>商品明细</span>
                        </div>
                    </div>
                </div>
                <div class="flex-jc-end border-top">
                    <div
                        style="width: 208px;display: grid;align-items: center;grid-template-columns: 1fr 1.2fr; text-align: end;padding: 40px 0;">
                        <div>商品件数:</div>
                        <div style="color: #FF6700;">{{ totalNum }}件</div>
                        <div>商品总价:</div>
                        <div style="color: #FF6700;">{{ totalMoney }}元</div>
                        <div>活动优惠:</div>
                        <div style="color: #FF6700;">-0元</div>
                        <div>优惠券抵扣:</div>
                        <div style="color: #FF6700;">-0元</div>
                        <div>运费:</div>
                        <div style="color: #FF6700;">0元</div>
                        <div>应付总额:</div>
                        <div style="color: #FF6700;"><span style="font-size: 30px;">{{ totalMoney }}</span>元</div>
                    </div>
                </div>
                <div class="flex-jc-end" style="gap: 10px;">
                    <div class="return-cart button" @click="$router.push('/ShoppingCart')">返回购物车</div>
                    <div class="settle button" @click="generateOrder">结算</div>
                </div>
            </div>
        </div>

        <el-dialog title="添加收货地址" :visible.sync="dialogVisible" @closed="resetDialog">
            <el-form ref="addressFormRef" :model="addressForm" :rules="addressFormRules">
                <el-row type="flex" justify="space-between" style="gap: 10px;">
                    <el-form-item prop="name" style="flex: 1;">
                        <el-input v-model="addressForm.name" placeholder="姓名"></el-input>
                    </el-form-item>
                    <el-form-item prop="phone" style="flex: 1;">
                        <el-input v-model="addressForm.phone" placeholder="手机号"></el-input>
                    </el-form-item>
                </el-row>
                <el-form-item prop="choose">
                    <el-cascader v-model="addressForm.choose" :options="addressOpt" class="w100" :props="areaProps"
                        placeholder="选择省/市/区/街道"></el-cascader>
                </el-form-item>
                <el-form-item prop="detailAddress">
                    <el-input v-model="addressForm.detailAddress" type="textarea" :rows="2" placeholder="详细地址">
                    </el-input>
                </el-form-item>
                <el-form-item prop="addressLabel">
                    <el-input v-model="addressForm.addressLabel" placeholder="地址标签">
                    </el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <el-row type="flex" justify="center" style="gap: 20px;">
                    <div class="button" style="background-color: #FF6700;color: white;" @click="confirm">确定</div>
                    <div class="button" style="background-color: #B0B0B0;color: white;">取消</div>
                </el-row>
            </template>
        </el-dialog>
    </div>
</template>
<script>
import { inquireAddress, inquireArea, addAddress } from '@/apis/address.js'
import { getToken } from '@/utils/auth';
import { createOrder } from '@/apis/order';

export default {
    name: "",
    data() {
        return {
            productList: [],
            // totalNum: 0,
            // totalMoney:0,
            addressList: [],
            dialogVisible: false,
            addressForm: {
                name: undefined,
                phone: undefined,
                choose: undefined,
                detailAddress: undefined,
                addressLabel: undefined
            },
            addressFormRules: {
                name: [{ required: true, message: '请输入姓名', trigger: ['blur'] }],
                phone: [{ required: true, message: '请输入手机号', trigger: ['blur'] }],
                choose: [{ required: true, message: '请输入姓名', trigger: ['blur'] }],
                detailAddress: [{ required: true, message: '请输入详细地址', trigger: ['blur'] }],
                addressLabel: [{ required: true, message: '请输入地址标签', trigger: ['blur'] }]
            },
            addressOpt: [],
            areaProps: {
                value: 'name',
                label: 'name',
                lazy: true,
                lazyLoad(node, resolve) {
                    if (node.root) return

                    inquireArea({ pid: node.data.id }).then(res => {

                        const nodes = res.data.map(i => {
                            const { id, name } = i
                            // console.log(addressForm);

                            return { id, name, leaf: node.level == 2 }
                        })

                        resolve(nodes)
                    })
                }
            },
            curIndex: 0,
            addressId: undefined,
            shoppingCartIds: []
        }
    },
    computed: {
        totalNum() {
            return this.productList.reduce((prev, cur) => {
                return prev + cur.num
            }, 0)
        },
        totalMoney() {
            return this.productList.reduce((prev, cur) => {
                return prev + cur.productSellingPrice * cur.num
            }, 0)
        },
        address() {
            return this.addressForm.choose.join()
        }
    },
    created() {
        this.inquireCart()
        this.listUserAddress()
        this.listArea()
    },
    methods: {
        // inquireNum() {
        //     inquireProductNum().then(res => {
        //         console.log(res);

        //     })
        // },
        inquireCart() {
            if (!getToken()) return
            this.productList = JSON.parse(this.$route.query.shoppingCartArray)
            // console.log(this.productList);
            this.shoppingCartIds = this.productList.map(item => {
                return item.shoppingCartId
            })
            // console.log(this.shoppingCartIds);


            // this.totalNum = this.productList.reduce((prev, cur) => {
            //     return prev + cur.num
            // }, 0)

        },
        listUserAddress() {
            if (!getToken()) return
            inquireAddress().then(res => {
                this.addressList = res.data
                if (this.addressList[this.curIndex]) {
                    this.addressId = this.addressList[this.curIndex].addressId
                }
            })
        },
        listArea() {
            inquireArea({ pid: 1 }).then(res => {
                this.addressOpt = res.data
            })
        },
        confirm() {
            const { detailAddress, addressLabel, choose = [] } = this.addressForm
            const area = choose.join(" ")

            addAddress({
                addressDtl: detailAddress,
                addressTags: addressLabel,
                area: area,
                ...this.addressForm
            }).then(res => {
                // console.log(res);
                if (res.code == 200) {
                    this.$message.success(res.msg)
                    this.$refs['addressFormRef'].resetFields()
                    this.dialogVisible = false
                    this.listUserAddress()
                } else {
                    this.$message.error(res.msg)
                }
            })
        },
        resetDialog() {
            this.$refs['addressFormRef'].resetFields()
        },
        chooseAddress(item, index) {
            // console.log(item,index);
            this.curIndex = index
            this.addressId = this.addressList[this.curIndex].addressId

        },
        generateOrder() {
            if(this.addressList.length==0) {
                this.$confirm('至少填写一个地址！', '提示', {
                    type: 'warning'
                }).then(() => {
                    
                }).catch(() => {
                    
                    
                })
                return
            }
            createOrder({
                addressId: this.addressId,
                shoppingCartIds: this.shoppingCartIds
            }).then(res => {
                // console.log(res);
                if(res.code==200){
                    this.$router.push('/order/inquire')
                    this.$store.dispatch('getShopCartNum')
                }
            })
        },
    }
}
</script>
<style lang="scss" scoped>
.product {
    div {
        padding: 5px 0;
        box-sizing: border-box;
    }
}

.return-cart {
    width: 160px;
    height: 38px;
    border: 1px solid #B0B0B0;
    color: #B0B0B0;
    box-sizing: border-box;
}

.settle {
    width: 160px;
    height: 38px;
    background-color: #FF6700;
    color: white;
}

.addressArea {

    display: grid;
    grid-template-columns: repeat(4, 1fr);
}

.button {
    width: 160px;
    height: 42px;
}


.common {
    width: 270px;
    height: 194px;
    border: 1px solid #B0B0B0;
    padding: 20px;
    box-sizing: border-box;
    gap: 5px
}

.active {
    border-color: #FF6700;
}
</style>
