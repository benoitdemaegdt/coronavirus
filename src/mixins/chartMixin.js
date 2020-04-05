import france from '@/data/spf/france.json';

const chartMixin = {
  data: () => ({
    labels: undefined,
    hospitalisations: { key: 'hospitalisations', label: 'Hospitalisations', color: '#C2185B', data: undefined },
    reanimations: { key: 'reanimations', label: 'Réanimations', color: '#5E35B1', data: undefined },
    deces: { key: 'deces', label: 'Décès cumulés', color: '#00897B', data: undefined },
  }),
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