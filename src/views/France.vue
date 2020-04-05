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
import geo from '@/data/geo.json';
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
      const baseOptions = {
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
      };
      if (category.key === 'reanimations') {
        return {
          ...baseOptions,
          annotation: {
            annotations: [
              {
                type: 'line',
                mode: 'horizontal',
                scaleID: 'y-axis-0',
                value: geo.france.nbr_lit_rea,
                borderColor: 'red',
                borderWidth: 2,
                label: {
                  enabled: true,
                  position: 'left',
                  yAdjust: -14,
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  content: `${geo.france.nbr_lit_rea} LITS RÉA`,
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
/* If the screen size is 601px wide or more, set max-width to 80%  */
@media screen and (min-width: 601px) {
  canvas {
    max-width: 1200px;
    margin: auto;
  }
}
</style>