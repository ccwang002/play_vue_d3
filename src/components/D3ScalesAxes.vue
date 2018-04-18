<template>
  <div class="d3-scales">
    <h3>D3 scales and axes</h3>
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
  methods: { },
  mounted: function () {
    const vm = this.$el
    const w = 500
    const h = 400
    const padding = 30

    // Scale function
    const xScale = d3.scaleLinear()
      .domain([0, d3.max(this.dataset, d => d[0])])
      .range([padding, w - padding * 2])
      .nice()
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(this.dataset, d => d[1])])
      .range([h - padding, padding])
      .nice()

    // Draw scatter plot
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
      .attr('r', 5)
    svg
      .selectAll('text')
      .data(this.dataset)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('x', d => xScale(d[0]))
      .attr('y', d => yScale(d[1]))
      .text(d => `(${d[0]}, ${d[1]})`)

    // Axes
    const xAxis = d3.axisBottom(xScale)
      // .ticks(5)
      .tickValues([0, 100, 200, 500])
    const yAxis = d3.axisLeft(yScale)
      .ticks(5)
    svg.append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(0, ${h - padding})`)
      .call(xAxis)
    svg.append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(${padding}, 0)`)
      .call(yAxis)
  }
}
</script>

<style lang="scss">
.d3-scales svg {
  .label {
    fill: purple;
    font-size: 0.75em;
  }
  .axis {
    path, line {
      stroke: teal;
      stroke-width: 1.5px;
      shape-rendering: crispEdges;
    }
    text {
      fill: teal
    }
  }
}
</style>
