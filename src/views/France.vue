<template>
  <v-container class="fill-height" fluid>
    <v-row>
      <v-col cols='12' sm='6'>
        <!-- hospitalisations -->
        <line-chart
          :chartData='getLineChartData(hospitalisations)'
          :options='getLineChartOptions(hospitalisations)'
          :styles="chartHeight">
        </line-chart>
      </v-col>
      <v-col cols='12' sm='6'>
        <!-- réanimations -->
        <line-chart
          :chartData='getLineChartData(reanimations)'
          :options='getLineChartOptions(reanimations)'
          :styles="chartHeight">
        </line-chart>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols='12'>
        <!-- décès -->
        <line-chart
          :chartData='getLineChartData(deces)'
          :options='getLineChartOptions(deces)'
          :styles="chartHeight">
        </line-chart>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// data
import france from '@/data/spf/france.json';

// mixin
import chartMixin from '@/mixins/chartMixin.js';

// components
import LineChart from '@/components/LineChart.vue';

export default {
  name: 'France',
  components: {
    LineChart,
  },
  mixins: [chartMixin],
  data: () => ({
    labels: undefined,
    hospitalisations: { key: 'hospitalisations', label: 'Hospitalisations', color: '#C2185B' },
    reanimations: { key: 'reanimations', label: 'Réanimations', color: '#5E35B1' },
    deces: { key: 'deces', label: 'Décès', color: '#00897B' },
  }),
  methods: {
    getLineChartData(category) {
      return {
        labels: this.getLabels,
        datasets: [{
          label: `${category.label}${String.fromCharCode(160)}`,
          pointBackgroundColor: category.color,
          borderColor: category.color,
          pointBorderColor: category.color,
          fill: false,
          lineTension: 0.1,
          data: france.map(elem => elem[category.key])
        }],
      };
    },
    getLineChartOptions(category) {
      return {
        scales: {
          yAxes: [{
            ticks: { beginAtZero: true },
            gridLines: { display: true }
          }],
          xAxes: [ { gridLines: { display: true } }]
        },
        legend: { display: false },
        title: {
          display: true,
          text: `${category.label} en France`,
        },
        tooltips: { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
        responsive: true,
        maintainAspectRatio: false,
        // annotation: {
        //   annotations: [
        //     {
        //       type: 'line',
        //       mode: 'vertical',
        //       scaleID: 'x-axis-0',
        //       value: '17/03/2020',
        //       borderColor: 'red',
        //       borderWidth: 2,
        //       label: {
        //         enabled: true,
        //         position: 'top',
        //         backgroundColor: 'rgba(0, 0, 0, 0.7)',
        //         content: 'DÉBUT CONFINEMENT',
        //       },
        //     },
        //   ],
        // },
      };
    },
  },
}
</script>

<style scoped>
/* If the screen size is 601px wide or more, set max-width to 80%  */
@media screen and (min-width: 601px) {
  canvas {
    max-width: 1200px;
    margin: auto;
  }
}
</style>