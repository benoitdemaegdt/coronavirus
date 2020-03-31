import france from '@/data/spf/france.json';

const chartMixin = {
  computed: {
    getLabels() {
      return france.map(elem => elem.date);
    },
    lastUpdate() {
      return france[france.length - 1].date;
    },
    chartHeight() {
      return {
        height: '340px',
        position: 'relative'
      };
    },
  }
}

export default chartMixin;