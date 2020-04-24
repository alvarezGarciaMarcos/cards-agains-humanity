import Vuex from "vuex";
import Vue from "vue";
import users from "./modules/users";
import game from "./modules/game";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    users,
    game,
  },
});
