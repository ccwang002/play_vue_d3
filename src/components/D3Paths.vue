<template>
  <div class="d3-paths">
    <h3>D3 Paths</h3>
    <svg></svg>
  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: 'D3Paths',
  props: {
    csvURL: String
  },
  computed: {
    dataset: function () {
      let rowConverter = d => ({
        date: new Date(+d.year, (+d.month - 1)),
        average: parseFloat(d.average)
      })
      return d3.csv(this.csvURL, rowConverter)
    }
  },
  mounted () {
    this.svg = d3.select(this.$el).select('svg')
    this.w = 600
    this.h = 300
    this.padding = { x: 30, y: 30 }
    this.svg
      .attr('width', this.w)
      .attr('height', this.h)
    this.dataset
      .then(this.initializePlot)
      .then(this.drawPlot)
  },
  watch: {
    csvURL: function (val, oldVal) {
      console.log(`Dataset URL changed to ${val}. Redraw the graph`)
      this.svg.html(null)
      this.dataset
        .then(this.initializePlot)
        .then(this.drawPlot)
    }
  },
  methods: {
    initializePlot: function (dataset) {
      const svg = this.svg
      // Create scale functions
      this.xScale = d3.scaleTime()
        .domain([
          d3.min(dataset, d => d.date),
          d3.max(dataset, d => d.date)
        ])
        .rangeRound([this.padding.x, this.w - this.padding.x])
      this.yScale = d3.scaleLinear()
        .domain([
          d3.min(dataset, function (d) {
            if (d.average >= 0) {
              return d.average
            }
          }) - 10,
          d3.max(dataset, d => d.average)])
        .rangeRound([this.h - this.padding.y, this.padding.y])

      // Define axes
      const formatTime = d3.timeFormat('%Y')
      const xAxis = d3.axisBottom()
        .scale(this.xScale)
        .ticks(10)
        .tickFormat(formatTime)
      const yAxis = d3.axisLeft()
        .scale(this.yScale)
        .ticks(10)

      // Create axes
      svg.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(0, ${this.h - this.padding.y})`)
        .call(xAxis)
      svg.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(${this.padding.x}, 0)`)
        .call(yAxis)

      return dataset
    },
    drawPlot: function (dataset) {
      const svg = this.svg

      // Draw line plot
      let line = d3.line()
        .defined(d => d.average >= 0 && d.average <= 350)
        .x(d => this.xScale(d.date))
        .y(d => this.yScale(d.average))
      let dangerLine = d3.line()
        .defined(d => d.average > 350)
        .x(d => this.xScale(d.date))
        .y(d => this.yScale(d.average))
      svg
        .append('path')
        .datum(dataset)
        .attr('class', 'line')
        .attr('d', line)
      svg
        .append('path')
        .datum(dataset)
        .attr('class', 'line danger')
        .attr('d', dangerLine)

      // Draw 350 ppm line
      // Note that axis is by default shifted 0.5px right and downwards
      // See https://groups.google.com/forum/#!topic/d3-js/-Sw0Wdnkeko
      svg.append('line')
        .attr('class', 'line safeLevel')
        .attr('x1', this.padding.x)
        .attr('x2', this.w - this.padding.x)
        .attr('y1', this.yScale(350))
        .attr('y2', this.yScale(350))
      
      // Label 350ppm line
      svg.append('text')
        .attr('class', 'safeLevel label')
        .attr('x', this.padding.x + 5)
        .attr('y', this.yScale(350) - 5)
        .text('350 ppm “safe” level')
    }
  }
}
</script>

<style lang="scss">
.d3-paths {
  margin-bottom: 3em;
}
.d3-paths svg {
  .axis {
    line {
      shape-rendering: crispEdges;
    }
  }
  .line {
    fill: none;
    stroke: teal;
    stroke-width: 1px;
  }
  .line.safeLevel {
    stroke: red;
    stroke-dasharray: 2, 3;
    stroke-width: 1.5px;
  }
  .line.danger {
    stroke: red;
  }
  text.safeLevel.label {
    fill: red;
    font-size: .6em;
    text-anchor: start;
  }
}
</style>
