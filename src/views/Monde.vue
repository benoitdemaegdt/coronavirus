<template>
  <v-container>

    <!-- infections -->
    <v-row>
      <v-col cols='12'>
        <v-card>
          <v-card-title>Cumul des cas confirmés par pays</v-card-title>
          <v-card-text>
            <line-chart
              :chartData='getLineChartData(infections)'
              :options='getLineChartOptions(infections)'
              :styles="chartHeight">
            </line-chart>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- deces -->
    <v-row>
      <v-col cols='12'>
        <v-card>
          <v-card-title>Cumul des décès par pays</v-card-title>
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
import countries from '@/data/politologue/countries.json';

// components
import LineChart from '@/components/LineChart.vue';

export default {
  name: 'Monde',
  components: {
    LineChart,
  },
  data: () => ({
    countryList: [
      { name: 'Allemagne', color: '#6A1B9A' },
      { name: 'Espagne', color: '#C62828' },
      { name: 'France', color: '#1565C0' },
      { name: 'Royaume-Uni', color: '#00695C' },
      { name: 'Italie', color: '#2E7D32' },
      { name: 'États-Unis', color: '#EF6C00' },
    ],
    infections: { key: 'infections', label: 'Cas confirmés' },
    deces: { key: 'deces', label: 'Décès cumulés' },
  }),
  methods: {
    getLineChartData(category) {
      return {
        labels: this.getLabels,
        datasets: this.countryList.map((country) => ({
          label: `${country.name}${String.fromCharCode(160)}`,
          pointBackgroundColor: country.color,
          borderColor: country.color,
          pointBorderColor: country.color,
          fill: false,
          lineTension: 0.1,
          data: countries.map(elem => elem.countries.find(item => item.country === country.name)[category.key])
        })),
      };
    },
    getLineChartOptions(category) {
      return {
        scales: {
          yAxes: [{
            ticks: { 
              beginAtZero: true,
              callback(value) {
                return (value < 10000) ? value : `${value/1000}k`;
              }
            },
            gridLines: { display: true },
          }],
          xAxes: [ { gridLines: { display: true } }]
        },
        legend: { display: true },
        tooltips: {
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          callbacks: {
            label(tooltipItem, data) {
              const country = data.datasets[tooltipItem.datasetIndex].label;
              const connector = country.includes('États-Unis')
              ? 'aux' : country.includes('Royaume-Uni')
                ? 'au' : 'en';
              const value = (tooltipItem.yLabel < 10000) ? tooltipItem.yLabel : `${(tooltipItem.yLabel/1000).toFixed(2)}k`;
              return `${category.label} ${connector} ${country} : ${value}`;
            }
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        annotation: {
          annotations: [
            {
              type: 'line',
              mode: 'vertical',
              scaleID: 'x-axis-0',
              value: '17/03/2020',
              borderColor: 'red',
              borderWidth: 2,
              label: {
                enabled: true,
                position: 'top',
                yAdjust: 8,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                content: 'DÉBUT CONFINEMENT FRANCE',
              },
            },
          ],
        },
      };
    },
  },
  computed: {
    getLabels() {
      return countries.map(elem => elem.date);
    },
    chartHeight() {
      return {
        height: '500px',
        position: 'relative'
      };
    },
  }
}
</script>

<style>

</style>