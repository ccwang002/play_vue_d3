<template>
    <div class="d3-root"></div>
</template>

<script>
import * as d3 from 'd3'
import csvURL from '../assets/data/food.csv'

export default {
  name: 'HelloD3',
  props: {},
  mounted () {
    d3
      .select('.d3-root')
      .append('h3')
      .append('text')
      .text(`D3 version: ${d3.version}`)
    d3.csv(csvURL)
      .then((data) => console.log(data))
  }
}
</script>

<style lang="scss">
</style>
