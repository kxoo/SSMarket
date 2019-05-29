const app = {
  state: {
    requestLoading: 0,
    wallet: 0,
    status: 0
  },
  mutations: {
    SET_LOADING: (state, status) => {
      if (status === 0) {
        /* eslint-disable*/
        state.requestLoading = 0;
        return;
      }
      /* eslint-disable*/
      state.requestLoading = status ? ++state.requestLoading : --state.requestLoading;
    },
    set_wallet: (state, data) => {
      state.wallet = data
    },
    set_status: (state, data) => {
      state.status = data
    }
  },
  actions: {
    SetLoading({ commit }, status) {
      commit('SET_LOADING', status);
    },
  },
};

export default app;
