<template>
    <div class="d3-root"></div>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: 'HelloD3',
  props: {},
  mounted () {
    d3
      .select('.d3-root')
      .append('h3')
      .append('text')
      .text(`D3 version: ${d3.version}`)
  }
}
</script>

<style lang="scss">
</style>
