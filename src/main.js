import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueSocketIO from "vue-socket.io";

Vue.use(
  new VueSocketIO({
    debug: false,
    connection: "http://localhost:3000"
  })
);

Vue.config.productionTip = false;

new Vue({
  router,
  propsData: { socket: "hello" },
  render: h => h(App)
}).$mount("#app");
