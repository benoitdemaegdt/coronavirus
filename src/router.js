import Vue from 'vue'
import VueRouter from 'vue-router'

// import views
import Home from '@/views/Home.vue';
import France from '@/views/France.vue';
import Regions from '@/views/Regions.vue';
import Departements from '@/views/Departements.vue';
import NotFound from '@/views/NotFound.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/coronavirus',
      name: 'home',
      component: Home,
    },
    {
      path: '/coronavirus/france',
      name: 'france',
      component: France,
    },
    {
      path: '/coronavirus/regions/:name',
      name: 'regions',
      component: Regions,
    },
    {
      path: '/coronavirus/departements/:name',
      name: 'departements',
      component: Departements,
    },
    {
      path: '*',
      component: NotFound,
    }
  ]
});

export default router;