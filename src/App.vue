<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "App",
  components: {},
  sockets: {
    black_card_set: function(card) {
      this.saveBlackCard(card);
    },
    new_player: function(user) {
      this.newUser(user);
    },
    current_user: function(user) {
      this.setCurrentUser(user);
    },
    update_all_users: function(users) {
      this.updateCurrentPlayers(users);
    },
    redirect_to_game: function() {
      this.$router.push({
        name: "game"
      });
    },
    card_picked: function(play) {
      this.savePlay(play);
    },
    timer_update: function(timer) {
      this.updateTimer(timer);
    },
    time_up: function() {
      console.log("Time's up!");
      /* this.$router.push({
        name: "endRound"
      }); */
    },
    next_player: function(nextPlayer) {
      this.setMasterPlayer(nextPlayer);
    },
    I_am_master_player: function() {
      this.$router.push({
        name: "blackCardPicker"
      });
    },
    finish_round: function() {
      this.$router.push({ name: "endRound" });
    }
  },
  methods: {
    ...mapActions([
      "saveBlackCard",
      "newUser",
      "setCurrentUser",
      "updateCurrentPlayers",
      "savePlay",
      "updateTimer",
      "setMasterPlayer"
    ])
  },
  created() {
    this.$socket.emit("current_user_request", {});
  }
};
</script>

<style>
body,
html {
  background-color: #e0e0e0;
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100vw;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
