<template>
  <v-container class="fill-height" fluid>
    <h1 class="display-2 text-center">Les données pour la région {{ getRegionName() }} seront bientôt disponibles 😊</h1>
  </v-container>
</template>

<script>
// data
import geo from '@/data/geo.json';

export default {
  name: 'Regions',
  methods: {
    getRegionName() {
      const region = geo.regions.find(region => region.searchable_region_name === this.$route.params.name);
      return region.region_name;
    }
  },
}
</script>

<style>

</style>