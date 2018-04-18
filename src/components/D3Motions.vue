<template>
  <div class="d3-motions">
    <h3>D3 motions</h3>
    <p>Click on this text to update the chart with new data values randomly.</p>
    <svg></svg>
  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: 'D3Motions',
  data: function () {
    return {
      dataset: Array
    }
  },
  methods: {
    initializePlot: function () {
      this.xScale = d3.scaleBand()
        .domain(d3.range(this.dataset.length))
        .rangeRound([this.padding.x, this.w - this.padding.x])
        .paddingInner(this.padding.inner)
      this.yScale = d3.scaleLinear()
        .domain([0, d3.max(this.dataset)])
        .range([this.h - this.padding.y, this.padding.y])
      this.yAxis = d3.axisLeft(this.yScale).ticks(5)
    },
    initialPlot: function () {
      const svg = d3.select(this.$el).select('svg')

      // Create clipping path
      svg.append('clipPath')
        .attr('id', 'chart-area')
        .append('rect')
        .attr('x', this.padding.x)
        .attr('y', this.padding.y)
        .attr('width', this.w - this.padding.x)
        .attr('height', this.h - this.padding.y)

      // Plot bars
      svg.append('g')
        .attr('id', 'rects')
        .attr('clip-path', 'url(#chart-area)')
        .selectAll('rect')
        .data(this.dataset)
        .enter()
        .append('rect')
        .attr('x', (d, i) => this.xScale(i))
        .attr('y', d => this.yScale(d))
        .attr('width', this.xScale.bandwidth())
        .attr('height', d => this.h - this.padding.y - this.yScale(d))
        .attr('fill', d => `rgb(0, 0, ${Math.round(d * 10)})`)

      // Plot labels
      svg.selectAll('text')
        .data(this.dataset)
        .enter()
        .append('text')
        .text(d => d)
        .attr('class', 'label')
        .attr('x', (d, i) => this.xScale(i) + this.xScale.bandwidth() / 2)
        .attr('y', (d, i) => this.yScale(d) + this.padding.label)

      // Add y axis
      svg.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(${this.padding.x - 5}, 0)`)
        .call(this.yAxis)
    },
    updatePlot: function () {
      const duration = 500
      const delay = 800
      const svg = d3.select(this.$el).select('svg')

      // Update all rects
      svg.select('g#rects')
        .selectAll('rect')
        .data(this.dataset)
        .transition()
        .delay((d, i) => i / this.dataset.length * delay)
        .duration(duration)
        // .ease(d3.easeCubicInOut)
        .attr('y', d => this.yScale(d))
        .attr('height', d => this.h - this.padding.y - this.yScale(d))
        .attr('fill', d => `rgb(0, 0, ${Math.round(d * 10)})`)

      let valTooLow = d => d <= Math.round(d3.max(this.dataset) * 0.05)

      // Update all labels
      svg.selectAll('text')
        .data(this.dataset)
        .classed('inverted', valTooLow)
        .transition()
        .delay((d, i) => i / this.dataset.length * delay)
        .duration(duration)
        .text(d => d)
        .attr('x', (d, i) => this.xScale(i) + this.xScale.bandwidth() / 2)
        .attr('y', (d, i) => {
          if (valTooLow(d)) {
            return this.yScale(d) - 3
          } else {
            return this.yScale(d) + this.padding.label
          }
        })

      // Update y axis
      svg.select('g.axis')
        .transition()
        .duration(duration)
        .call(this.yAxis)
    }
  },
  mounted: function () {
    this.w = 600
    this.h = 300
    this.padding = { x: 30, y: 30, inner: 0.15, label: 10 }
    this.dataset = [
      5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
      11, 12, 15, 20, 18, 17, 16, 18, 23, 25
    ]
    d3.select(this.$el).select('svg')
      .attr('width', this.w)
      .attr('height', this.h)
    this.initializePlot()
    this.initialPlot()

    // Click and update with data
    const vm = this
    d3.select(this.$el).select('p')
      .on('click', function () {
        // New values for dataset (randomized)
        vm.dataset = vm.dataset.map(x => Math.floor(Math.random() * 50))
      })
  },
  watch: {
    dataset: function (val, oldVal) {
      this.initializePlot()
      this.updatePlot()
    }
  }
}
</script>

<style lang="scss">
.d3-motions {
  margin-bottom: 3em;
}
.d3-motions svg {
  .label {
    text-anchor: middle;
    fill: white;
    font-size: 0.5em;
  }
  .label.inverted {
    fill: black;
  }
}
</style>
