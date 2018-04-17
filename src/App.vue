<template>
  <div id="app" class="container">
    <HelloD3></HelloD3>
    <!-- <img src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"></HelloWorld> -->
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import HelloD3 from './components/HelloD3.vue'

export default {
  name: 'app',
  components: {
    HelloWorld,
    HelloD3
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
