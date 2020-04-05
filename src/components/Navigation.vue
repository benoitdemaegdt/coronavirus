<template>
  <nav>
    <!-- app bar -->
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-4"
      >
        <router-link :to="{ name: 'home'}" class='toolbar-title'>Coronavirus en France</router-link
        >
      </v-toolbar-title>
      <v-autocomplete
        v-model="searchNavigation"
        flat
        solo-inverted
        hide-details
        clearable
        prepend-inner-icon="mdi-magnify"
        label="Chercher une région ou un département"
        class="hidden-sm-and-down"
        :items="regions.concat(departements)"
        item-text="name"
        item-value="path"
        return-object
      />
      <v-spacer />
      <a href="https://twitter.com/benoit_demaegdt" target="_blank">
        <v-btn icon class="d-none d-sm-flex">
          <i class="fab fa-twitter" style="font-size:24px"></i>
        </v-btn>
      </a>
      <a href="https://github.com/benoitdemaegdt/coronavirus" target="_blank">
        <v-btn icon class="d-none d-sm-flex">
          <i class="fab fa-github" style="font-size:24px"></i>
        </v-btn>
      </a>
    </v-app-bar>

    <!-- navigation drawer -->
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >

      <v-list nav>

        <!-- accueil -->
        <v-list-item :to="{ name: 'home'}" exact color='primary'>
          <v-list-item-icon><v-icon>mdi-home</v-icon></v-list-item-icon>
          <v-list-item-title>Accueil</v-list-item-title>
        </v-list-item>

        <!-- france -->
        <v-list-item :to="{ name: 'france'}" color='primary'>
          <v-list-item-icon><v-icon>mdi-glass-wine</v-icon></v-list-item-icon>
          <v-list-item-title>France</v-list-item-title>
        </v-list-item>
        
        <!-- regions -->
        <v-list-group prepend-icon='mdi-food-croissant' no-action>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Regions</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="region in regions"
            :key="region.name"
            :to="{ name: 'regions', params: { name: region.searchable_name }}"
          >
            <v-list-item-content>
              <v-list-item-title v-text="region.name"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <!-- departements -->
        <v-list-group prepend-icon='mdi-baguette' no-action>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Départements</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="departement in departements"
            :key="departement.name"
            :to="{ name: 'departements', params: { name: departement.searchable_name }}"
          >
            <v-list-item-content>
              <v-list-item-title v-text="departement.name"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
// data
import geo from '@/data/geo.json';

export default {
  data: () => ({
    drawer: undefined,
    searchNavigation: undefined,
    regions: geo.regions.map(region => ({
      name: region.region_name,
      searchable_name: region.searchable_region_name,
      path: `/coronavirus/regions/${region.searchable_region_name}`,
    })),
    departements: geo.departements.map(dep => ({
      name: dep.dep_name,
      searchable_name: dep.searchable_dep_name,
      path: `/coronavirus/departements/${dep.searchable_dep_name}`,
    })),
  }),
  watch: {
    searchNavigation: {
      handler(newRoute) {
        if (newRoute) {
          this.$router.push({ path: newRoute.path });
        }
      }
    }
  }
}
</script>

<style scoped>
.toolbar-title {
  color: white;
  text-decoration: none;
}
</style>