export const validAuthData = (state, payload) => {
  state.auth.valid = {
    key: payload.key,
    url: payload.url
  };
};

export const currentAuthData = (state, payload) => {
  state.auth.current = payload;
};

export const user = (state, payload) => {
  state.user = payload.user;
};

export const lastRoute = (state, payload) => {
  state.lastRoute = payload;
};

export const tasks = (state, payload) => {
  state.tasks = payload.issues;
};

export const logout = (state) => {
  state.user = {};
};

export const globalAlert = (state, payload) => {
  state.globalAlert = payload;
};

export const createTimer = (state, payload) => {
  console.log(payload);
  state.timers = [...state.timers, payload];
  console.log(state.timers);
};

export const completeTimer = (state, payload) => {
  const id = payload.id;

  state.timers.map(item => {
    if (item.id === id) {
      item.complete = true;
    }

    return item;
  });

  console.log(state);
};

export const deleteTimer = (state, payload) => {
  state.timers = state.timers.filter(item => item.id !== payload.id);
};
