export const key = state => {
  if (state.auth && state.auth.valid && state.auth.valid.key) {
    return state.auth.valid.key;
  }
  if (state.auth && state.auth.current && state.auth.current.key) {
    return state.auth.current.key;
  }
  return '';
};

export const url = state => {
  if (state.auth && state.auth.valid && state.auth.valid.url) {
    return state.auth.valid.url;
  }
  if (state.auth && state.auth.current && state.auth.current.url) {
    return state.auth.current.url;
  }
  return '';
};

export const lastRoute = state => {
  return state.lastRoute ? state.lastRoute : '/';
};

export const isLoggedIn = state => state.user && state.user.hasOwnProperty('id');

export const tasks = state => state.tasks;

export const globalAlert = state => state.globalAlert;

export const timers = state => state.timers.filter(item => !item.complete);
export const getCompletedTimers = state => state.timers.filter(item => item.complete);
export const getAllTimers = state => state.timers;
