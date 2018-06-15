import * as getters  from './getters';
import * as mutations from './mutations';

export const initialState = {
  todos: [],
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
  user: {}
};

export {
  getters,
  mutations
};
