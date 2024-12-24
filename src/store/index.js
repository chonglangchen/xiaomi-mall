import Vue from 'vue'
import Vuex from 'vuex'
import { getToken } from '@/utils/auth'
import { inquireProductNum } from '@/apis/shoppingCart'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pId: undefined,
    select: [],
    shoppingCartLength: 0,
    shopCartCount: 0,
    userInfo: {}
  },
  getters: {
    filePreUrl() {
      return process.env.VUE_APP_FILE_PREURL
    },
    hasInfo(state) {
      return Object.keys(state.userInfo).length > 0
    }
  },
  mutations: {
    setShopCartCount(state, payload) {
      state.shopCartCount = payload
    },
    setUserInfo(state, payload) {
      state.userInfo = payload
    }
  },
  actions: {
    getShopCartNum({ commit }) {
      if (!getToken()) return
      inquireProductNum().then(res => {
        // this.shopCartCount = res.data
        commit('setShopCartCount', res.data)
        
      })
    },
    getUserInfo({ commit }) {
      detailUserInfo().then(res => {
        commit('setUserInfo', res.data)
      })
    },
  },
  modules: {
  }
})
