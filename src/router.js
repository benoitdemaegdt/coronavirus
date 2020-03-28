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
      component: Home,
    },
    {
      path: '/coronavirus/france',
      component: France,
    },
    {
      path: '/coronavirus/regions/:name',
      component: Regions,
    },
    {
      path: '/coronavirus/departements/:name',
      component: Departements,
    },
    {
      path: '*',
      component: NotFound,
    }
  ]
});

export default router;