<script>
import { Bar } from 'vue-chartjs'
import 'chartjs-plugin-annotation';

export default {
  name: 'MixedChart',
  extends: Bar,
  props: {
    chartData:  {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
  data() {
    return {
      options: {
        scales: {
          yAxes: [
            {
              type: 'linear',
              id:'left-axis',
              display: true,
              position: 'left',
              ticks: { beginAtZero: true },
              gridLines: { display: true }
            },
            {
              type: 'linear',
              id: 'right-axis',
              display: true,
              position: 'right',
              stacked: false,
              scaleLabel: { display: true, labelString: '%' },
              gridLines: { drawOnChartArea: false }
            },
          ],
          xAxes: [ {
            gridLines: {
              display: true,
            },
          }]
        },
        legend: {
          display: true
        },
        tooltips: {
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
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
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                content: 'DÉBUT CONFINEMENT',
              },
            },
          ],
        },
      },
    };
  },
};
</script>