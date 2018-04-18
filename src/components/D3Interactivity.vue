<template>
  <div class="d3-interactivity">
    <h3>D3 interactivity</h3>
    <p>
      Tooltip position:
      <select v-model="selected">
        <option v-for="option in options" v-bind:value="option.value" v-bind:key="option.value">
          {{ option.text }}
        </option>
      </select>
    </p>
    <svg></svg>
    <div class="d3-tooltip hidden">
      <p><strong>Tooltip Heading</strong></p>
      <p><span class="value">100</span>%</p>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: 'D3Interactivity',
  data: function () {
    return {
      'selected': 'fixed-x',
      'options': [
        {text: 'Fixed X position', value: 'fixed-x'},
        {text: 'Floated', value: 'floated'}
      ]
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
      const vm = this
      const svg = this.svg

      // Plot bars
      const bars = svg.append('g')
        .attr('id', 'rects')
        .selectAll('rect')
        .data(this.dataset)
        .enter()
        .append('rect')
        .attr('x', (d, i) => this.xScale(i))
        .attr('y', d => this.yScale(d))
        .attr('width', this.xScale.bandwidth())
        .attr('height', d => this.h - this.padding.y - this.yScale(d))
        .attr('fill', d => `rgb(0, 0, ${Math.round(d * 10)})`)

      // Dynamic label
      const tooltip = d3.select(vm.$el).select('.d3-tooltip')
      bars
        .on('mouseenter', function (d) {
          tooltip
            .select('.value')
            .text(d)
          tooltip.classed('hidden', false)
        })
        .on('mousemove', function (d) {
          const mousePagePos = {x: d3.event.pageX, y: d3.event.pageY}
          let tooltipPagePos = mousePagePos
          if (vm.selected === 'fixed-x') {
            // The tooltip will always in the middle of the bar
            let barPageRect = this.getBoundingClientRect()
            tooltipPagePos.x = barPageRect.left + barPageRect.width / 2
          }
          tooltip
            .style('left', tooltipPagePos.x + 'px')
            .style('top', tooltipPagePos.y + 'px')
        })
        .on('mouseout', function (d) {
          tooltip.classed('hidden', true)
        })

      // Add y axis
      svg.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(${this.padding.x - 5}, 0)`)
        .call(this.yAxis)
    }
  },
  mounted: function () {
    this.svg = d3.select(this.$el).select('svg')
    this.w = 600
    this.h = 300
    this.padding = { x: 30, y: 30, inner: 0.15, label: 10 }
    this.dataset = [
      5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
      11, 12, 15, 20, 18, 17, 16, 18, 23, 25
    ]
    this.svg
      .attr('width', this.w)
      .attr('height', this.h)
    this.initializePlot()
    this.initialPlot()
  }
}
</script>

<style lang="scss">
.d3-interactivity {
  margin-bottom: 3em;
  svg {
    #rects rect:hover {
      fill: orange;
    }
  }
  .d3-tooltip {
    position: absolute;
    width: 10em;
    padding: .5em;
    background-color: white;
    border-radius: 10px;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.4);
    pointer-events: none;
    p {
      margin: 0;
      padding: 0;
    }
  }
  .hidden {
    display: none;
  }
}

</style>
