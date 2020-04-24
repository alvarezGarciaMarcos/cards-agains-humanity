const state = {
  blackCard: undefined,
  plays: new Map(),
  masterPlayer: {},
  timer: 10,
};

const getters = {
  blackCard: (state) => state.blackCard,
  timer: (state) => state.timer,
  plays: (state) => {
    const playsCopy = new Map(state.plays);
    let whiteCards = Array.from(playsCopy).slice(1, playsCopy.size);
    whiteCards = new Map(whiteCards);
    const object = {
      blackCard: state.plays[0],
      whiteCards: whiteCards,
    };
    return object;
  },
  masterPlayer: (state) => state.masterPlayer,
};

const actions = {
  cardPicked: function({ commit }, play) {
    commit("submitPlay", play);
  },
  saveBlackCard({ commit }, blackCard) {
    commit("setBlackCard", blackCard);
  },
  savePlay({ commit }, play) {
    commit("savePlay", play);
  },
  updateTimer({ commit }, timer) {
    commit("updateTimer", timer);
  },
  setMasterPlayer({ commit }, player) {
    commit("setMasterPlayer", player);
  },
  setBlackCard({ commit }, card) {
    commit("setBlackCard", card);
  },
};

const mutations = {
  submitPlay: (state, play) => {
    state.plays.push(play);
  },
  setBlackCard: (state, card) => (state.blackCard = card),
  savePlay: (state, play) => {
    state.plays.set(play.user.username, play.card);
  },
  updateTimer: (state, timer) => (state.timer = timer),
  setMasterPlayer: (state, player) => (state.masterPlayer = player),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
