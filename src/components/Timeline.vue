<template>
  <vue-horizontal-timeline
    timeline-background='white'
    timeline-padding='1px'
    :items="events"
  />
</template>

<script>
import { VueHorizontalTimeline } from "vue-horizontal-timeline";

export default {
  name: 'Timeline',
  components: {
    VueHorizontalTimeline,
  },
  data() {
    return {
      events: [
        {
          title: '31 janvier 2020',
          content: 'Arrivée en france de 180 ressortissants français en provenance de Wuhan, foyer de l\'épidémie du coronavirus.',
        },
        {
          title: '29 février 2020',
          content: 'Le gouvernement français interdit les rassemblements confinés de plus de 5 000 personnes.',
        },
        {
          title: '3 mars 2020',
          content: 'Passage au stade 2 de l\'épidémie. Existence de regroupements de cas répartis sur le territoire français.',
        },
        {
          title: '12 mars 2020',
          content: '1er discours du président Macron. Annonce de la fermeture de tous les établissements scolaires à partir du 16 mars.',
        },
        {
          title: '15 mars 2020',
          content: 'Passage au stade 3 de l\'épidémie. Fermeture de tous les commerces non essentiels et des stations de ski.',
        },
        {
          title: '16 mars 2020',
          content: '2ème discours du président Macron. Les français doivent se confiner chez eux à partir du 17 mars à 12h.',
        },
      ],
    };
  },
};
</script>

<style scoped>
/* override few css rules of component */
.vue-horizontal-timeline {
  box-shadow: none !important;
  background: #e9e9e9;
}

.vue-horizontal-timeline .timeline {
  padding: 9em 0 !important;
}

.vue-horizontal-timeline .timeline .title {
  color: #2c3e50 !important;
}

.vue-horizontal-timeline .timeline ol li .time {
  box-shadow: 6.5px 8px 3px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12) !important;
}

.vue-horizontal-timeline .timeline ol li .time:hover {
  box-shadow: 9px 12px 6px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12) !important;
}

/* color of the circle */
.vue-horizontal-timeline .timeline ol li:not(:last-child)::after {
  background: #E53935;
}

/* color of the line */
.vue-horizontal-timeline .timeline ol li {
  background: #00ACC1 !important;
}

/* avoid overflow as much as possible */
.vue-horizontal-timeline .timeline ol li:last-child {
  width: 0px !important;
}
</style>