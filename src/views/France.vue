<template>
  <v-container>

    <!-- first chart -->
    <mixed-chart :chartData='formatFranceLineChart()' :styles="chartHeight"></mixed-chart>

    <!-- second chart -->
    <!-- <line-chart :chartData='formatRegionLineChart()' :styles="chartHeight"></line-chart> -->

  </v-container>
</template>

<script>
// data
import covid19 from '@/data/covid19.json';

// components
// import LineChart from '@/components/LineChart.vue';
import MixedChart from '@/components/MixedChart.vue';

export default {
  name: 'France',
  components: {
    // LineChart,
    MixedChart,
  },
  mounted() {
    this.covid19 = covid19;
  },
  data() {
    return {
      covid19: [],
      colors: [
        '#039BE5', '#00ACC1', '#00897B', '#43A047',
        '#C0CA33', '#FFB300', '#F4511E', '#546E7A',
        '#6D4C41', '#5E35B1', '#880E4F', '#3949AB',
        '#E53935', '#8E24AA', '#C0CA33',
      ],
      regions: [
        'Auvergne-Rhône-Alpes', 'Bourgogne-Franche-Comté',
        'Bretagne', 'Centre-Val de Loire', 'Corse', 'Grand Est',
        'Hauts-de-France', 'Ile-de-France', 'Normandie',
        'Nouvelle-Aquitaine', 'Occitanie', 'Pays de la Loire',
        'Provence-Alpes-Côte d’Azur', 'DROM',
      ],
    };
  },
  methods: {
    formatFranceLineChart() {
      const labels = covid19.map(elem => elem.Date);
      const test = 
      console.log(test);
      return {
        labels,
        datasets: [
          {
            label: `France${String.fromCharCode(160)}`,
            type: 'line',
            pointBackgroundColor: this.colors[0],
            borderColor: this.colors[0],
            pointBorderColor: this.colors[0],
            fill: false,
            lineTension: 0.1,
            yAxisID: 'left-axis',
            data: covid19.map(elem => elem.France),
          },
          {
            label: `Évolution J-1 (%)${String.fromCharCode(160)}`,
            type: 'bar',
            backgroundColor: 'pink',
            borderColor: 'pink',
            yAxisID: 'right-axis',
            borderWidth: 3,
            data: covid19.map((elem, index) => {
              return index === 0 ? 0 : Math.round((elem.France / covid19[index - 1].France - 1) * 100) || 0;
            }),
          },
        ],
      };
    },
    formatRegionLineChart() {
      const labels = covid19.map(elem => elem.Date);
      const datasets = []
      for (const [index, region] of this.regions.entries()) {
        datasets.push({
          label: `${region}${String.fromCharCode(160)}`,
          pointBackgroundColor: this.colors[index],
          borderColor: this.colors[index],
          pointBorderColor: this.colors[index],
          fill: false,
          lineTension: 0.1,
          data: covid19.map(elem => elem[`${region}`]),
        })
      }
      return {
        labels,
        datasets,
      };
    },
  },
  computed: {
    lastUpdate() {
      return covid19[covid19.length - 1].Date;
    },
    chartHeight() {
      return {
        height: '500px',
        position: 'relative'
      };
    },
  },
}
</script>

<style>
/* If the screen size is 601px wide or more, set max-width to 80%  */
@media screen and (min-width: 601px) {
  canvas {
    max-width: 1200px;
    margin: auto;
  }
}
</style>