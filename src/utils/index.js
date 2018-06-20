import Requester from '../Services/Requester';

export const makeTransition = () => {
  requestAnimationFrame(() => {
    const els = Array.from(document.body.querySelectorAll('[routing-animation]'));
    els.forEach((el, index) => {
      try {
        const $placeholder = document.getElementsByClassName('placeholder')[index];
        $placeholder.classList.add('hide');
      } catch (e) {
      }
      setTimeout(() => {
        try {
          const $placeholders = document.getElementsByClassName('placeholder');
          for (let item of $placeholders) {
            item.style.display = 'none';
          }
        } catch (e) {
        }
        el.classList.add('is-preparedRoutingAnimation');
      }, 50 * index);
    });
  });
};

export const redirectToAuth = async (to, from, next, store) => {
  if (store.getters.isLoggedIn || to.path === '/auth' || to.path === '/') {
    next();
  } else {
    next('/auth');
  }
};

export const mainRouteHandler = (to, from, next, store) => {
  const lastRoute = store.getters.lastRoute;
  const isLoggedIn = store.getters.isLoggedIn;
  let navigateTo = lastRoute !== '/' ? lastRoute : '/auth';
  if (!isLoggedIn) {
    navigateTo = '/auth';
  }
  next(navigateTo);
};

export const checkLoggedIn = async (store) => {
  try {
    const url = store.getters.url;
    const key = store.getters.key;
    window.requester = new Requester(key, url, store);
    const res = await window.requester.getUser();
    store.commit('user', res);
  } catch (e) {
    console.log(store);
    if (store.getters.isLoggedIn) {
      store.commit('globalAlert', {
        show: true,
        heading: 'Auth Error',
        text: 'It looks like your redmine credentials are obsolete. You will be redirected to Auth page to reenter your credentials',
        callback: () => {
          logout(store);
        }
      });
    }
  }
};

export const logout = (store) => {
  store.commit('logout');
  window.location.hash = '#/auth';
};
