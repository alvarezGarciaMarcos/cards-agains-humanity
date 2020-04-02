import Vue from "vue";
import Router from "vue-router";

import Username from "./components/Username.vue";
import Game from "./components/Game.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      component: Username
    },
    {
      name: "game",
      path: "/game/:username",
      component: Game,
      props: true
    }
  ]
});
