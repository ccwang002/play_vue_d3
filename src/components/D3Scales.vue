<template>
  <div class="d3-scales">
    <h3>D3 scales</h3>
    <svg></svg>
  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: 'D3Scales',
  props: {
    dataset: Array
  },
  mounted: function () {
    const vm = this.$el
    const w = 500
    const h = 400
    const padding = 20

    const xScale = d3.scaleLinear()
      .domain([0, d3.max(this.dataset, d => d[0])])
      .range([padding, w - padding * 2])
      .nice()
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(this.dataset, d => d[1])])
      .range([h - padding, padding])
      .nice()

    const svg = d3.select(vm).select('svg')
      .attr('width', w)
      .attr('height', h)
    svg
      .selectAll('circle')
      .data(this.dataset)
      .enter()
      .append('circle')
      .attr('cx', d => xScale(d[0]))
      .attr('cy', d => yScale(d[1]))
      .attr('r', 10)
    svg
      .selectAll('text')
      .data(this.dataset)
      .enter()
      .append('text')
      .attr('x', d => xScale(d[0]))
      .attr('y', d => yScale(d[1]))
      .text(d => `(${d[0]}, ${d[1]})`)
  }
}
</script>

<style lang="scss">
.d3-scales svg {
  text {
    fill: purple;
    font-size: 0.75em;
  }
}
</style>
