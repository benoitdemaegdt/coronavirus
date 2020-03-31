<script>
import { Line } from 'vue-chartjs'
import 'chartjs-plugin-annotation';

export default {
  name: 'LineChart',
  extends: Line,
  props: {
    title: {
      type: String,
      required: true,
    },
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
          yAxes: [{
            ticks: { beginAtZero: true },
            gridLines: { display: true }
          }],
          xAxes: [ { gridLines: { display: true } }]
        },
        legend: { display: false },
        title: {
          display: true,
          text: this.title,
        },
        tooltips: {
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
        },
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
      },
    };
  },
};
</script>