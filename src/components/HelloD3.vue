<template>
  <div class="d3-root">
    <h3></h3>
    <h4>Loaded data:</h4>
    <ul></ul>
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
      this.d3data.then(function (dataset) {
        d3
          .select('.d3-root ul')
          .selectAll('li')
          .data(dataset)
          .enter()
          .append('li')
          .text((d) => `${d.Food} (${d.Deliciousness})`)
      })
    }
  },
  mounted () {
    d3
      .select('.d3-root h3')
      .append('h3')
      .append('text')
      .text(`D3 version: ${d3.version}`)
    this.drawD3()
  }
}
</script>

<style scoped lang="scss">
.d3-root {
  text-align: left;
  display: flex;
  flex-direction: column;

  ul, h4, h3 {
    align-self: center;
    text-align: left;
    max-width: 30rem;
  }
}
</style>
