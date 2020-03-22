<template>
  <div id='app'>
    <div class='lastUpdate'>mis à jour le {{ lastUpdate }}</div>
    <div class='content'>
      <h1>Le coronavirus en france</h1>
      <p>Quelques visualisations sur l'évolution de l'épidémie du coronavirus en France.</p>
      <img src='@/assets/coronavirus.png'>
      <h2>Source des données</h2>
      <p>
        Les données à l'origine des graphes ci-dessous proviennent de <a href='https://www.data.gouv.fr/fr/datasets/cas-confirmes-dinfection-au-covid-19-par-region/'>data.gouv.fr</a>,
        la plateforme d'open data du gouvernement français. Elles sont mises à disposition par
        <a href="https://www.data.gouv.fr/fr/users/bastien-guerry/">Bastien Guerry</a> (ingénieur chez Etalab) qui agrège et
        met en forme les informations données par Santé Publique France lors de ses <a href='https://www.santepubliquefrance.fr/maladies-et-traumatismes/maladies-et-infections-respiratoires/infection-a-coronavirus/articles/infection-au-nouveau-coronavirus-sars-cov-2-covid-19-france-et-monde'>points quotidiens</a>
        sur l'épidémie du coronavirus.
      </p>
      <h2>Validité des données</h2>
      <p>
        Les données de Santé Publique France sur le nombre de cas <b>confirmés</b> d'infection au coronavirus par région
        est très certainement loin du nombre de cas <b>réels</b> d'infection. Les consignes du gouvernement sont claires&nbsp;:
      </p>
      <p><i>Je me fais tester uniquement si je suis une personne fragile ou à risque, si je présente des signes de gravité [...]</i></p>
      <p>
        Les personne infectée mais initialement en bonne santé ainsi que les personnes asymptomatiques (infectées mais sans aucun symptôme clinique)
        ne seront donc probablement pas répertoriées dans ces données.
      </p>
      <p>
        La valeur absolue de ces données n'a donc pas un grand intérêt. C'est plutôt la tendance qui est ici intéressante.
      </p>
      <h2>Évolution du nombre de cas confirmés en France</h2>
      <p>En bleu : le nombre de cas confirmés d'infection au coronavirus sur le territoire français.</p>
      <p>En rose : l'augmentation du nombre de cas entre le jour J et le jour J-1.</p>
    </div>

    <!-- first chart -->
    <mixed-chart :chartData='formatFranceLineChart()' :styles="chartHeight"></mixed-chart>
  
    <div class='content'>
      <h2>Évolution du nombre de cas confirmés dans chaque région</h2>
      <p>Pour y voir plus clair, vous pouvez cliquer sur la légende correspondant à la courbe que vous souhaitez retirer.</p>
    </div>

    <!-- second chart -->
    <line-chart :chartData='formatRegionLineChart()' :styles="chartHeight"></line-chart>

  </div>
</template>

<script>
// data
import covid19 from './data/covid19.json';

// components
import LineChart from './components/LineChart.vue';
import MixedChart from './components/MixedChart.vue';

export default {
  name: 'App',
  components: {
    LineChart,
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: auto;
  margin-top: 40px;
}

.lastUpdate {
  position:absolute;
  top: 10px;
  right: 10px;
}

/* If the screen size is 601px wide or more, set max-width to 80%  */
@media screen and (min-width: 601px) {
  .content {
    max-width: 750px;
    margin: auto;
  }
  canvas {
    max-width: 1200px;
    margin: auto;
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

p {
  text-align: left;
}

img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}
</style>
