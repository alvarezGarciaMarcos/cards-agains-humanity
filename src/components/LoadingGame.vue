<template>
  <div class="container">
    <h1>Active Players</h1>
    <div class="players">
      <span :key="key" v-for="(user, key) in this.allUsers">{{user.username}}</span>
    </div>
    <button @click="onClick" class="play">Play!</button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: mapGetters(["allUsers"]),
  methods: {
    onClick() {
      this.$socket.emit("redirect_to_game");
    }
  }
};
</script>

<style scoped>
.players {
  width: 10vw;
  height: 80vh;
  display: flex;
  font-size: 3em;
}

.players span {
  margin: 1em;
}

.play {
  height: 10vh;
  width: 90vw;
  background-color: greenyellow;
  font-size: 5em;
  border-radius: 30px;
  flex-wrap: wrap;
  flex-flow: row;
}
h1 {
  margin: 0;
}

@media (max-width: 700px) {
  .container {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    grid-template-areas:
      ". h1 ."
      ". players ."
      ". button .";
    font-size: 0.5em;
  }
  h1 {
    grid-area: h1;
  }

  .players {
    grid-area: players;
  }

  button {
    font-size: 0.5em;
    grid-area: button;
  }
}
</style>