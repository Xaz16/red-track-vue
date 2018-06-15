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
          const $placeholder = document.getElementsByClassName('placeholder')[index];
          $placeholder.style.display = 'none';
        } catch (e) {
        }
        el.classList.add('is-preparedRoutingAnimation');
      }, 50 * index);
    });
  });
};

export const redirectToAuth = (to, from, next, store) => {
  if (store.getters.isLoggedIn) {
    next();
  } else {
    next('/auth');
  }
};

export const mainRouteHandler = (to, from, next, store) => {
  const lastRoute = store.getters.lastRoute;
  const navigateTo = lastRoute !== '/' ? lastRoute : '/auth';
  next(navigateTo);
};
