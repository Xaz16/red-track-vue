import Vue                  from 'vue';
import VueRouter            from 'vue-router';
import VueForm              from 'vue-form';
import Vuex                 from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import App                                  from './App.vue';
import Storage                              from '../Services/Storage';
import Requester                            from '../Services/Requester';
import { initialState, getters, mutations } from '../store';
import { Auth, Logs, Tasks, Timers }        from '../components/pages';
import { mainRouteHandler, redirectToAuth } from '../utils';

Vue.use(VueRouter);
Vue.use(VueForm);
Vue.use(Vuex);
Vue.config.productionTip = false;

const init = (store) => {
  const url = store.getters.url;
  const key = store.getters.key;
  console.log(store, store.getters.key, store.getters.url);
  if (!url || !key) {
    return store.commit('clear');
  }
  window.requester = new Requester(key, url);
};

const store = new Vuex.Store({
  state: initialState,
  plugins: [createPersistedState({
    storage: new Storage()
  })],
  mutations,
  getters
});

const routes = [
  {
    path: '/',
    beforeEnter: (to, from, next) => mainRouteHandler(to, from, next, store)
  },
  {path: '/auth', component: Auth},
  {path: '/timers', component: Timers, beforeEnter: (to, from, next) => redirectToAuth(to, from, next, store)},
  {path: '/tasks', component: Tasks, beforeEnter: (to, from, next) => redirectToAuth(to, from, next, store)},
  {path: '/logs', component: Logs, beforeEnter: (to, from, next) => redirectToAuth(to, from, next, store)}
];

const router = new VueRouter({
  routes
});

router.afterEach((to) => {
  store.commit('lastRoute', to.fullPath);
  document.querySelector('html').setAttribute('style', 'width:700px;height:500px');
});

new Vue({
  router,
  store,
  render: f => f(App)
}).$mount('#root');

init(store);
