import { createStore } from "vuex";

export default createStore({
  state: {
    users: [],
    paginatedUsers: [],
  },
  getters: {
    getUsers(state) {
      return state.users;
    },
    getPaginatedUsers(state) {
      return state.paginatedUsers;
    },
  },
  actions: {
    sortUsers({ commit, state }, data) {
      const sortedData = state.paginatedUsers.sort(function (a, b) {
        if (a[data.col] > b[data.col]) {
          return data.ascending ? 1 : -1;
        } else if (a[data.col] < b[data.col]) {
          return data.ascending ? -1 : 1;
        }
        return 0;
      });
      commit("setPaginatedUsers", sortedData);
    },
    paginateUsers({ commit, state }, data) {
      const paginatedUsers = state.users.filter((row, index) => {
        let start = (data.currentPage - 1) * data.rowsPerPage;
        let end = data.currentPage * data.rowsPerPage;
        if (index >= start && index < end) return true;
      });
      commit("setPaginatedUsers", paginatedUsers);
    },
  },
  mutations: {
    setUsers(state, data) {
      state.users = data;
    },
    setPaginatedUsers(state, data) {
      state.paginatedUsers = data;
    },
  },
});
