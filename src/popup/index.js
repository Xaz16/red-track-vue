import Vue       from 'vue';
import VueRouter from 'vue-router';

import App                              from './App.vue';
import { Auth, Timers, Tasks, Logs } from '../components/pages';

Vue.use(VueRouter);
Vue.config.productionTip = false;

const routes = [
  {path: '/', redirect: '/auth'},
  {path: '/auth', component: Auth},
  {path: '/timers', component: Timers},
  {path: '/tasks', component: Tasks},
  {path: '/logs', component: Logs}
];

const router = new VueRouter({
  routes
});

/* eslint-disable no-new */
new Vue({
  router,
  render: f => f(App)
}).$mount('#root');
