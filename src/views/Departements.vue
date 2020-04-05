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
        title: {
          display: true,
          text: `${category.label} en ${this.getDepartementName()}`,
        },
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

</style>