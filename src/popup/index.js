import Vue                  from 'vue';
import VueRouter            from 'vue-router';
import VueForm              from 'vue-form';
import Vuex                 from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import '../directives';

import App                                                 from './App.vue';
import { initialState, getters, mutations, actions }       from '../store';
import { Auth, Logs, Tasks, Timers }                       from '../components/pages';
import { mainRouteHandler, redirectToAuth, checkLoggedIn } from '../utils';

Vue.use(VueRouter);
Vue.use(VueForm);
Vue.use(Vuex);
Vue.config.productionTip = false;

const store = new Vuex.Store({
  state: initialState,
  plugins: [createPersistedState()],
  mutations,
  getters,
  actions
});

const routes = [
  {
    path: '/',
    beforeEnter: (to, from, next) => mainRouteHandler(to, from, next, store)
  },
  {path: '/auth', component: Auth},
  {path: '/timers', component: Timers},
  {path: '/tasks', component: Tasks},
  {path: '/logs', component: Logs}
];

const router = new VueRouter({
  routes
});

router.afterEach((to) => {
  store.commit('lastRoute', to.fullPath);
  document.querySelector('html').setAttribute('style', 'width:700px;height:500px');
});

router.beforeEach((to, from, next) => redirectToAuth(to, from, next, store));

checkLoggedIn(store);

new Vue({
  router,
  store,
  render: f => f(App)
}).$mount('#root');
