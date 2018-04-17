<template>
  <div id="app" class="container">
    <HelloD3 :csvURL='csvURL'></HelloD3>
    <D3Scales></D3Scales>
    <!-- <img src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"></HelloWorld> -->
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import HelloD3 from './components/HelloD3.vue'
import D3Scales from './components/D3Scales.vue'
import csvURL from './assets/data/food.csv'

export default {
  name: 'app',
  components: {
    HelloWorld,
    HelloD3,
    D3Scales
  },
  data: function () {
    return {
      csvURL: csvURL
    }
  }
}
</script>

<style lang="scss">
@import "scss/custom";
@import "~bootstrap/scss/bootstrap";

#app {
  text-align: center;
  color: gray("750");
  padding: 60px 0;
}
</style>
