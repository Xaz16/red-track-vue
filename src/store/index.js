import * as getters   from './getters';
import * as mutations from './mutations';
import * as actions   from './actions';

export const initialState = {
  tasks: [],
  globalAlert: {
    show: false,
    text: ''
  },
  timersClocks: [],
  auth: {
    valid: {
      url: '',
      key: ''
    },
    current: {
      url: '',
      key: ''
    }
  },
  user: {},
  timers: []
};

export {
  getters,
  actions,
  mutations
};
