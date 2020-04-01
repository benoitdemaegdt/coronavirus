<script>
import { Line } from 'vue-chartjs'
import 'chartjs-plugin-annotation';

export default {
  name: 'LineChart',
  extends: Line,
  props: {
    chartData:  {
      type: Object,
      required: true,
    },
    options: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
  watch: {
    // vue-chartjs is not reactive
    chartData () {
      this.$data._chart.destroy()
      this.renderChart(this.chartData, this.options);
    }
  }
};
</script>