<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols='12' sm='4'>
        <v-card hover color="#F8BBD0">
          <v-card-title>{{ getLastFigure('hospitalisations') }}</v-card-title>
          <v-card-subtitle>Personnes actuellement hospitalisées</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col cols='6' sm='4'>
        <v-card hover color="#D1C4E9">
          <v-card-title>{{ getLastFigure('reanimations') }}</v-card-title>
          <v-card-subtitle>Personnes actuellement en réanimations</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col cols='6' sm='4'>
        <v-card hover color="#B2DFDB">
          <v-card-title>{{ getLastFigure('deces') }}</v-card-title>
          <v-card-subtitle>Personnes décédées depuis le début de l'épidémie</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols='12' sm='6'>
        <!-- hospitalisations -->
        <v-card>
          <v-card-title>Nombre de patients hospitalisés en {{ getDepartementName() }}</v-card-title>
          <v-card-text>
            <line-chart
              :chartData='getLineChartData(hospitalisations)'
              :options='getLineChartOptions(hospitalisations)'
              :styles="chartHeight">
            </line-chart>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols='12' sm='6'>
        <!-- réanimations -->
        <v-card>
          <v-card-title>Nombre de personnes en réanimation en {{ getDepartementName() }}</v-card-title>
          <v-card-text>
            <line-chart
              :chartData='getLineChartData(reanimations)'
              :options='getLineChartOptions(reanimations)'
              :styles="chartHeight">
            </line-chart>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols='12'>
        <!-- décès -->
        <v-card>
          <v-card-title>Nombre cumulé de personnes décédées en {{ getDepartementName() }}</v-card-title>
          <v-card-text>
            <line-chart
              :chartData='getLineChartData(deces)'
              :options='getLineChartOptions(deces)'
              :styles="chartHeight">
            </line-chart>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// data
import geo from '@/data/geo.json';
import departements from '@/data/spf/departements.json';

// mixin
import chartMixin from '@/mixins/chartMixin.js';

// components
import LineChart from '@/components/LineChart.vue';

export default {
  name: 'Departements',
  components: {
    LineChart,
  },
  mixins: [chartMixin],
  created() {
    this.labels = this.getLabels;
    this.handleRouteChange();
  },
  watch: {
    $route() {
      this.handleRouteChange();
    }
  },
  methods: {
    getLastFigure(category) {
      const lastDataForDepartement = departements[departements.length - 1].departements.find(dep => dep.name === this.getDepartementName());
      return lastDataForDepartement[category].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    },
    handleRouteChange() {
      this.hospitalisations.data = this.getDataByCategory('hospitalisations');
      this.reanimations.data = this.getDataByCategory('reanimations');
      this.deces.data = this.getDataByCategory('deces');
    },
    getDepartementName() {
      const dep = geo.departements.find(dep => dep.searchable_dep_name === this.$route.params.name);
      return dep.dep_name;
    },
    getDataByCategory(category) {
      return departements.map((departements) => {
        return departements.departements.find(dep => dep.name === this.getDepartementName())[category];
      });
    },
    getLineChartData(category) {
      return {
        labels: this.labels,
        datasets: [{
          label: `${category.label}${String.fromCharCode(160)}`,
          pointBackgroundColor: category.color,
          borderColor: category.color,
          pointBorderColor: category.color,
          fill: false,
          lineTension: 0.1,
          data: category.data,
        }],
      };
    },
    getLineChartOptions(category) {
      const baseOptions = {
        scales: {
          yAxes: [{
            ticks: { beginAtZero: true },
            gridLines: { display: true }
          }],
          xAxes: [ { gridLines: { display: true } }]
        },
        legend: { display: false },
        tooltips: { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
        responsive: true,
        maintainAspectRatio: false,
      };
      if (category.key === 'reanimations') {
        const dep = geo.departements.find(dep => dep.searchable_dep_name === this.$route.params.name);
        return {
          ...baseOptions,
          annotation: {
            annotations: [
              {
                type: 'line',
                mode: 'horizontal',
                scaleID: 'y-axis-0',
                value: dep.nbr_lit_rea,
                borderColor: 'red',
                borderWidth: 2,
                label: {
                  enabled: true,
                  position: 'left',
                  yAdjust: 14 * (Math.max(...this.reanimations.data) > dep.nbr_lit_rea ? -1 : 1),
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  content: `${dep.nbr_lit_rea} LITS RÉA`,
                },
              },
            ],
          },
        };
      }
      return baseOptions;
    },
  },
}
</script>

<style scoped>
/* If the screen size is 601px wide or more  */
@media screen and (min-width: 601px) {
  canvas {
    max-width: 1200px;
    margin: auto;
  }
}
</style>