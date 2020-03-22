<template>
  <div id="app">
    <h1>Le coronavirus en france</h1>
    <p>blablabla</p>
    <h2>Source des données</h2>
    <p>Santé Publique France blablabla</p>
    <h2>Évolution du nombre de cas en France</h2>
    <p>blablablabla</p>
    <line-chart :chartData='formatFranceLineChart()' :styles="chartHeight"></line-chart>
    <h2>Évolution du nombre de cas dans chaque région</h2>
    <p>blablablabla</p>
    <line-chart :chartData='formatRegionLineChart()' :styles="chartHeight"></line-chart>
  </div>
</template>

<script>
// data
import covid19 from './data/covid19.json';

// components
import LineChart from './components/LineChart.vue';

export default {
  name: 'App',
  components: {
    LineChart,
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
      return {
        labels,
        datasets: [{
          label: `France${String.fromCharCode(160)}`,
          pointBackgroundColor: this.colors[0],
          borderColor: this.colors[0],
          pointBorderColor: this.colors[0],
          fill: false,
          lineTension: 0.1,
          data: covid19.map(elem => elem.France),
        }],
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: auto;
  margin-top: 40px;
}

/* If the screen size is 601px wide or more, set max-width to 700px  */
@media screen and (min-width: 601px) {
  #app {
    max-width: 1000px;
  }
  p {
    font-size: 21px;
  }
  a {
    font-size: 21px;
  }
}

/* If the screen size is 600px wide or less, set max-width to 100% */
@media screen and (max-width: 600px) {
  #app {
    max-width: 100%;
  }
  p {
    font-size: 18px;
  }
  a {
    font-size: 18px;
  }
}
</style>
