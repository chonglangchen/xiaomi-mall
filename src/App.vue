<template>
  <div>
    <top-nav-bar></top-nav-bar>
    <router-view />
    <bottom></bottom>
  </div>
</template>

<script>
import Bottom from './components/Bottom.vue';
import TopNavBar from './components/TopNavBar.vue';

export default {
  components: {
    TopNavBar,
    Bottom
  },
  created(){
    this.$store.dispatch('getShopCartNum')
  }
}
</script>

<style lang="scss"></style>
