import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueSocketIO from "vue-socket.io";
import store from "./store";

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: "http://127.0.0.1:3000",
  })
);

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  propsData: { socket: "hello" },
  render: (h) => h(App),
}).$mount("#app");
