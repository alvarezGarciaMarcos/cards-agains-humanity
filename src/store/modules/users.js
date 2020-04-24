const state = {
  user: {},
  users: [],
};

const getters = {
  allUsers: (state) => state.users,
  currentUser: (state) => state.user,
};

const actions = {
  newUser({ commit }, user) {
    commit("addUser", user);
  },
  setId({ commit }, id) {
    commit("setId", id);
  },
  setCurrentUser({ commit }, user) {
    commit("setCurrentUser", user);
  },
  updateCurrentPlayers({ commit }, users) {
    commit("updateCurrentPlayers", users);
  },
};

const mutations = {
  addUser: (state, user) => {
    state.users.push(user);
  },
  setId: (state, id) => (state.user.id = id),
  setCurrentUser: (state, user) => (state.user = user),
  updateCurrentPlayers: (state, users) => {
    state.users = users.map((user) => user[1]);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
