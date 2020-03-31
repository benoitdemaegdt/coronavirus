<template>
  <v-container class="fill-height" fluid>
    <v-row>
      <v-col cols='12' sm='6'>
        <!-- hospitalisations -->
        <line-chart
          title='Hospitalisations par jour en France'
          :chartData='formatHospitalisationsLineChart()'
          :styles="chartHeight">
        </line-chart>
      </v-col>
      <v-col cols='12' sm='6'>
        <!-- réanimations -->
        <line-chart
          title='Réanimations par jour en France'
          :chartData='formatReanimationsLineChart()'
          :styles="chartHeight">
        </line-chart>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols='12'>
        <!-- décès -->
        <line-chart
          title='Décès cumulés en France'
          :chartData='formatDecesLineChart()'
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
// import MixedChart from '@/components/MixedChart.vue';

export default {
  name: 'France',
  components: {
    LineChart,
    // MixedChart,
  },
  mixins: [chartMixin],
  methods: {
    formatHospitalisationsLineChart() {
      const labels = this.getLabels;
      return {
        labels,
        datasets: [{
          label: `Hospitalisations${String.fromCharCode(160)}`,
          pointBackgroundColor: '#C2185B',
          borderColor: '#C2185B',
          pointBorderColor: '#C2185B',
          fill: false,
          lineTension: 0.1,
          data: france.map(elem => elem.hospitalisations),
        }],
      };
    },
    formatReanimationsLineChart() {
      const labels = this.getLabels;
      return {
        labels,
        datasets: [{
          label: `Réanimations${String.fromCharCode(160)}`,
          pointBackgroundColor: '#5E35B1',
          borderColor: '#5E35B1',
          pointBorderColor: '#5E35B1',
          fill: false,
          lineTension: 0.1,
          data: france.map(elem => elem.reanimations),
        }],
      };
    },
    formatDecesLineChart() {
      const labels = this.getLabels;
      return {
        labels,
        datasets: [{
          label: `Décès${String.fromCharCode(160)}`,
          pointBackgroundColor: '#00897B',
          borderColor: '#00897B',
          pointBorderColor: '#00897B',
          fill: false,
          lineTension: 0.1,
          data: france.map(elem => elem.deces),
        }],
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