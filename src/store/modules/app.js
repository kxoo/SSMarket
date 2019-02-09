const app = {
  state: {
    requestLoading: 0,
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
  },
  actions: {
    SetLoading({ commit }, status) {
      commit('SET_LOADING', status);
    },
  },
};

export default app;
