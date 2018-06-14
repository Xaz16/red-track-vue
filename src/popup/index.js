import Vue       from 'vue';
import VueRouter from 'vue-router';
import VueForm   from 'vue-form';

import App                           from './App.vue';
import { Auth, Timers, Tasks, Logs } from '../components/pages';
import Storage                       from '../Services/Storage';

window.storage = new Storage();

Vue.use(VueRouter);
Vue.use(VueForm);
Vue.config.productionTip = false;

const redirectToAuth = async (to, from, next) => {
  const {user} = await window.storage.getInstance.get('user');
  if (user && user.hasOwnProperty('id')) {
    next();
  } else {
    next('/auth');
  }
};

const routes = [
  {
    path: '/',
    beforeEnter: async (to, from, next) => {
      const {lastRoute} = await window.storage.getInstance.get();
      const navigateTo = lastRoute !== '/' ? lastRoute : '/auth';
      next(navigateTo);
    }
  },
  {path: '/auth', component: Auth},
  {path: '/timers', component: Timers, beforeEnter: redirectToAuth},
  {path: '/tasks', component: Tasks, beforeEnter: redirectToAuth},
  {path: '/logs', component: Logs, beforeEnter: redirectToAuth}
];

const router = new VueRouter({
  routes
});

router.afterEach((to) => {
  window.storage.getInstance.set({lastRoute: to.fullPath});
  document.querySelector('html').setAttribute('style', 'width:700px;height:500px')
});

/* eslint-disable no-new */
new Vue({
  router,
  render: f => f(App)
}).$mount('#root');
