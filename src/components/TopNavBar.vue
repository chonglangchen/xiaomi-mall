<template>
    <div class="">
        <div class="top-container">
            <div class="content public-width flex-jc-end h100" style="gap: 20px;">
                <div class="flex" style="gap: 5px;">
                    <span class="flex-ai-center" @click="dialogLoginVisible = true">登录</span>
                    <span class="flex-ai-center">|</span>
                    <span class="flex-ai-center" @click="dialogRegisterVisible = true">注册</span>
                </div>
                <span class="flex-ai-center order" @click="toOrder">我的订单</span>
                <span class="flex-ai-center" @click="toCollect">我的收藏</span>
                <span class="flex-ai-center shop-car" style="background-color: #424242;"
                    @click="toShoppingCart">购物车({{ $store.state.shopCartCount }})</span>
            </div>
        </div>
        <div class="nav-container">
            <div class="content h100 public-width flex-jc-sb flex-ai-center">
                <div class="left flex-jc-sb" style="gap: 150px;">
                    <img src='@/assets/img/logo.png' alt="">
                    <div class="flex-ai-center">
                        <el-menu :default-active="$route.path" active-text-color="#409EFF" mode="horizontal" router>
                            <el-menu-item index="/home/index">首页</el-menu-item>
                            <el-menu-item index="/home/product">全部商品</el-menu-item>
                            <el-menu-item index="/home/about">关于我们</el-menu-item>
                        </el-menu>
                    </div>
                </div>
                <div class="right flex">
                    <el-input placeholder="请输入内容">
                        <template #append>
                            <el-button icon="el-icon-search"></el-button>
                        </template>
                    </el-input>
                </div>
            </div>
        </div>
        <!-- 登录 -->
        <el-dialog :visible.sync="dialogLoginVisible" width="306px" @close="resetLoginDialog">
            <template #title>
                <div class="flex-jc-center">登录</div>
            </template>
            <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules">
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" placeholder="请输入账号"
                        prefix-icon="el-icon-user-solid"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" placeholder="请输入密码" prefix-icon="el-icon-view"></el-input>
                </el-form-item>
            </el-form>
            <div class="flex-jc-center">
                <el-button type="primary" style="width: 250px;" @click="handleLogin">登录</el-button>
            </div>
        </el-dialog>

        <!-- 注册 -->
        <el-dialog :visible.sync="dialogRegisterVisible" width="306px" @close="resetRegisterDialog">
            <template #title>
                <div class="flex-jc-center">注册</div>
            </template>
            <el-form ref="registerFormRef" :model="registerForm" :rules="registerFormRules">
                <el-form-item prop="username">
                    <el-input v-model="registerForm.username" placeholder="请输入账号"
                        prefix-icon="el-icon-user-solid"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="registerForm.password" placeholder="请输入密码" prefix-icon="el-icon-view"></el-input>
                </el-form-item>
                <el-form-item prop="rePassword">
                    <el-input v-model="registerForm.rePassword" placeholder="请再次输入密码"
                        prefix-icon="el-icon-view"></el-input>
                </el-form-item>
            </el-form>
            <div class="flex-jc-center">
                <el-button type="primary" style="width: 250px;" @click="handleRegister">注册</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { userLogin, userRegister } from '@/apis/user';
import { getToken, setToken } from '@/utils/auth';
import { inquireProductNum } from '@/apis/shoppingCart';

export default {
    name: "",
    data() {
        const checkPsw = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请再次输入密码'))
            }
            else if (value != this.registerForm.password) {
                // 校验不通过
                callback(new Error('两次密码输入不一致'))
            }
            // 校验通过，直接调用callback，不传值
            else {
                callback()
            }
        }
        return {
            dialogLoginVisible: false,
            dialogRegisterVisible: false,
            loginForm: {
                username: undefined,
                password: undefined
            },
            loginFormRules: {
                username: [{ required: true, message: '请输入用户名', trigger: ['blur'] }],
                password: [{ required: true, message: '请输入密码', trigger: ['blur'] }]
            },
            registerForm: {
                username: undefined,
                password: undefined,
                rePassword: undefined
            },
            registerFormRules: {
                username: [{ required: true, message: '请输入用户名', trigger: ['blur'] }],
                password: [{ required: true, message: '请输入密码', trigger: ['blur'] }],
                rePassword: [{ required: true, validator: checkPsw, trigger: ['blur'] }]
            },
        }
    },
    created() {
    },
    methods: {

        handleLogin() {
            this.$refs['loginFormRef'].validate(valid => {
                if (!valid) return
                userLogin(this.loginForm).then(res => {
                    if (res.code == 200) {
                        this.$message.success(res.msg)
                        this.dialogLoginVisible = false
                        setToken(res.data)
                    } else {
                        this.$message.error(res.msg)
                    }
                })
            })
        },
        handleRegister() {
            this.$refs['registerFormRef'].validate(valid => {
                if (!valid) return
                userRegister(this.registerForm).then(res => {
                    if (res.code = 200) {
                        this.$message.success(res.msg)
                        this.dialogRegisterVisible = false
                    } else {
                        this.$message.error(res.msg)
                    }
                })
            })
        },
        resetLoginDialog() {
            this.$refs['loginFormRef'].resetFields()
        },
        resetRegisterDialog() {
            this.$refs['registerFormRef'].resetFields()
        },
        toOrder() {
            this.$router.push('/order/inquire')
            if (!getToken()) {
                this.$confirm('请先登录！', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.$router.push('/home/index')
                }).catch(() => {
                    this.$router.push('/home/index')
                    
                })
            }
        },
        toCollect() {
            this.$router.push('/collect')
            if (!getToken()) {
                this.$confirm('请先登录！', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.$router.push('/home/index')
                }).catch(() => {
                    this.$router.push('/home/index')
                    
                })
            }
        },
        toShoppingCart() {
            this.$router.push('/shoppingCart')
            if (!getToken()) {
                this.$confirm('请先登录！', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.$router.push('/home/index')
                }).catch(() => {
                    this.$router.push('/home/index')
                    
                })
            }
        },
    }
}
</script>
<style lang="scss" scoped>
.nav-container {
    padding: 10px 0;
}
</style>
