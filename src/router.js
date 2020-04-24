import Vue from "vue";
import Router from "vue-router";

import Username from "./components/Username.vue";
import Game from "./components/Game.vue";
import LoadingGame from "./components/LoadingGame.vue";
import EndRound from "./components/EndRound.vue";
import BlackCardPicker from "./components/BlackCardPicker.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      component: Username,
    },
    {
      name: "game",
      path: "/game",
      component: Game,
      props: true,
    },
    {
      name: "lobby",
      path: "/lobby",
      component: LoadingGame,
    },
    {
      name: "endRound",
      path: "/endround",
      component: EndRound,
    },
    {
      name: "blackCardPicker",
      path: "/cardPicker",
      component: BlackCardPicker,
    },
  ],
});
