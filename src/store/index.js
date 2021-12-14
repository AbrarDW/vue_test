import { createStore } from "vuex";

export default createStore({
  state: {
    users: [],
  },
  getters: {
    getUsers( state ){
        return state.users
    }
  },
  actions: {
    sortUsers({ commit, state }, data) {
      const sortedData = state.users.sort(function(a, b) {
          if (a[data.col] > b[data.col]) {
              return data.ascending ? 1 : -1
          } else if (a[data.col] < b[data.col]) {
              return data.ascending ? -1 : 1
          }
          return 0
      })
      commit('setUsers', sortedData)
    }
  },
  mutations: {
    setUsers( state, data ){
        state.users = data;
    }
  },
});
