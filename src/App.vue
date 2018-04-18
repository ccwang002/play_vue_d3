<template>
  <div id="app" class="container">
    <HelloD3 :csvURL='csvURL'></HelloD3>
    <!-- <D3ScalesAxes :dataset='scalesDataset'></D3ScalesAxes> -->
    <D3Motions></D3Motions>
    <D3Motions></D3Motions>
    <D3Interactivity></D3Interactivity>
    <!-- <img src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"></HelloWorld> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import csvURL from './assets/data/food.csv'
import HelloD3 from './components/HelloD3.vue'
// import D3ScalesAxes from './components/D3ScalesAxes.vue'
import D3Motions from './components/D3Motions.vue'
import D3Interactivity from './components/D3Interactivity.vue'

// const scalesDataset = [
//   [5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
//   [410, 12], [475, 44], [25, 67], [85, 21], [220, 88]
// ]

export default {
  name: 'app',
  components: {
    // HelloWorld,
    HelloD3,
    // D3ScalesAxes,
    D3Motions,
    D3Interactivity
  },
  data: function () {
    return {
      csvURL
      // scalesDataset
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
