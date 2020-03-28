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
        <router-link to='/coronavirus' class='toolbar-title'>Coronavirus en France</router-link
        >
      </v-toolbar-title>
      <v-spacer />
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

        <!-- france -->
        <v-list-item to='/coronavirus/france' color='primary'>
          <v-list-item-icon><v-icon>mdi-home</v-icon></v-list-item-icon>
          <v-list-item-title>France</v-list-item-title>
        </v-list-item>
        
        <!-- regions -->
        <v-list-group prepend-icon='mdi-home' no-action>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Regions</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="region in regions"
            :key="region.name"
            :to='region.path'
          >
            <v-list-item-content>
              <v-list-item-title v-text="region.name"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <!-- departements -->
        <v-list-group prepend-icon='mdi-home' no-action>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Départements</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="departement in departements"
            :key="departement.name"
            :to='departement.path'
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
export default {
  data: () => ({
    drawer: null,
    regions: [
      { name: 'île de france', path: '/coronavirus/regions/ile-de-france' },
      { name: 'occitanie', path: '/coronavirus/regions/occitanie' },
    ],
    departements: [
      { name: 'deux sèvres', path: '/coronavirus/departements/deux-sevres' },
      { name: 'rhônes', path: '/coronavirus/departements/rhones' },
    ]
    // items: [
    //   { icon: 'mdi-view-dashboard', text: 'France', path: '/france' },
    //   {
    //     icon: 'mdi-chevron-up',
    //     'icon-alt': 'mdi-chevron-down',
    //     text: 'Régions',
    //     model: false,
    //     children: [
    //       { text: 'hey' },
    //       { text: 'Export' },
    //       { text: 'Print' },
    //       { text: 'Undo changes' },
    //       { text: 'Other contacts' },
    //     ],
    //   },
    //   {
    //     icon: 'mdi-chevron-up',
    //     'icon-alt': 'mdi-chevron-down',
    //     text: 'Départements',
    //     model: false,
    //     children: [
    //       { text: 'Import' },
    //       { text: 'Export' },
    //       { text: 'Print' },
    //       { text: 'Undo changes' },
    //       { text: 'Other contacts' },
    //     ],
    //   },
    // ],
  }),
}
</script>

<style scoped>
.toolbar-title {
  color: white;
  text-decoration: none;
}
</style>