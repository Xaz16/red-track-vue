import { initialState } from './index';

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

export const clear = (state) => {
  state = initialState;
};
