<template>
  <div class="hello-d3">
    <h3></h3>
    <h4>Loaded data:</h4>
    <ul></ul>
    <svg></svg>
  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: 'HelloD3',
  props: {
    csvURL: String
  },
  computed: {
    d3data: function () {
      return d3.csv(this.csvURL, d => ({
        Food: d.Food,
        Deliciousness: parseFloat(d.Deliciousness)
      }))
    }
  },
  methods: {
    drawD3: function () {
      const vm = this.$el
      const svg = d3.select(vm).select('svg')
      this.d3data.then(function (dataset) {
        d3
          .select(vm)
          .select('ul')
          .selectAll('li')
          .data(dataset)
          .enter()
          .append('li')
          .text((d) => `${d.Food} (${d.Deliciousness})`)

        // Add shapes
        svg
          .selectAll('circle')
          .data(dataset)
          .enter()
          .append('circle')
          .attr('cx', function (d, i) {
            return (i * 50) + 25
          })
          .attr('cy', 50)
          .attr('r', d => d.Deliciousness * 2)
          .classed('circle', true)

        // Add label
        svg
          .selectAll('text')
          .data(dataset)
          .enter()
          .append('text')
          .text((d) => d.Food)
          .attr('x', (d, i) => (i * 50) + 25)
          .attr('y', (d, i) => i % 2 === 0 ? 20 : 90)
      })
    }
  },
  mounted () {
    const vm = this.$el
    d3
      .select(vm).select('h3')
      .append('text')
      .text(`D3 version: ${d3.version}`)
    this.drawD3()
  }
}
</script>

<style lang="scss">
.hello-d3 {
  text-align: left;
  display: flex;
  flex-direction: column;
  margin-bottom: 5em;

  ul, h4, h3, svg {
    align-self: center;
    text-align: left;
    max-width: 30rem;
  }

  svg {
    height: 100px;
    width: 300px;

    text {
      font-size: 0.75em;
      text-anchor: middle;
    }

    circle.circle {
      stroke: blueviolet;
      stroke-width: 2px;
      fill: black;
    }
  }
}
</style>
