import Vue from 'vue'
import VueRouter from 'vue-router'
import { getToken } from '@/utils/auth'
import { MessageBox } from 'element-ui';


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home/index'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/home/Index.vue')
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('@/views/home/About.vue')
      },
      {
        path: 'product',
        name: 'Product',
        component: () => import('@/views/home/Product.vue')
      },
    ]
  },
  {
    path: '/detail',
    name: 'Detail',
    component: () => import('@/views/Detail.vue')
  },
  {
    path: '/shoppingCart',
    name: 'ShoppingCart',
    component: () => import('@/views/ShoppingCart.vue')
  },
  {
    path: '/collect',
    name: 'Collect',
    component: () => import('@/views/Collect.vue')
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('@/views/Order.vue'),
    children:[
      {
        path: 'inquire',
        name: 'Inquire',
        component: () => import('@/views/order/Inquire.vue')
      },
      {
        path: 'createOrder',
        name: 'CreateOrder',
        component: () => import('@/views/order/CreateOrder.vue')
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

// const whitePages = [
//   '/home/index',
//   '/home/product',
//   '/home/about',
//   // '/home'
// ]

// 路由守卫
// 前置守卫
// router.beforeEach((to, from, next) => {
//   // 判断是否有token，且没有获取过用户信息
//   // if (!!getToken() && !store.getters.hasInfo) {
//   //   store.dispatch('getUserInfo')
//   // }
//   // next()


//   // 是否有token
//   if (getToken()) {
//     if (!store.getters.hasInfo) {
//       // 已登录，自动获取用户信息
//       store.dispatch('getUserInfo')
//     }
//     // 已登录，不让去 登录/注册页，重定向至首页
//     // if (to.path === '/login' || to.path === '/register') return next('/home/index')

//     // 正常页面跳转
//     next()
//   } else {
//     // 未登录,白名单，放行
//     if (whitePages.includes(to.path)) return next()

//       next(to.path)
//     MessageBox.confirm('请先登录', '系统提示', {
//       type: 'warning',
//       showCancelButton: false,
//       showClose: false,
//       closeOnPressEscape: false,
//       closeOnClickModal: false
//     }).then(() => {
//       // 先去登录
//       next('/home/index')
//     })

//   }
// })

export default router
