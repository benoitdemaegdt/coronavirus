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
import regions from '@/data/spf/regions.json';

// mixin
import chartMixin from '@/mixins/chartMixin.js';

// components
import LineChart from '@/components/LineChart.vue';

export default {
  name: 'Regions',
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
    getRegionName() {
      const region = geo.regions.find(region => region.searchable_region_name === this.$route.params.name);
      return region.region_name;
    },
    getDataByCategory(category) {
      return regions.map((regions) => {
        return regions.regions.find(region => region.name === this.getRegionName())[category];
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
          text: `${category.label} en ${this.getRegionName()}`,
        },
        tooltips: { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
        responsive: true,
        maintainAspectRatio: false,
      };
      if (category.key === 'reanimations') {
        const region = geo.regions.find(region => region.searchable_region_name === this.$route.params.name);
        return {
          ...baseOptions,
          annotation: {
            annotations: [
              {
                type: 'line',
                mode: 'horizontal',
                scaleID: 'y-axis-0',
                value: region.nbr_lit_rea,
                borderColor: 'red',
                borderWidth: 2,
                label: {
                  enabled: true,
                  position: 'left',
                  yAdjust: 14 * (Math.max(...this.reanimations.data) > region.nbr_lit_rea ? -1 : 1),
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  content: `${region.nbr_lit_rea} LITS RÉA`,
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
