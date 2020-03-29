<template>
  <v-container class="fill-height" fluid>
    <h1 class="display-2 text-center">Les données pour le département {{ getDepartementName() }} seront bientôt disponibles 😊</h1>
  </v-container>
</template>

<script>
// data
import geo from '@/data/geo.json';

export default {
  name: 'Departements',
  methods: {
    getDepartementName() {
      const dep = geo.departements.find(dep => dep.searchable_dep_name === this.$route.params.name);
      return dep.dep_name;
    }
  },
}
</script>

<style>

</style>