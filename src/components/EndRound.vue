<template>
  <div class="container">
    <div class="whiteCards">
      <Card
        color="white"
        :key="index"
        :text="play[1]"
        v-for="(play, index) in this.plays.whiteCards"
        @picked="handlePick"
      ></Card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
console.log("I know you have been picked!!");
import Card from "../components/Card.vue";
export default {
  components: {
    Card
  },
  computed: mapGetters(["plays", "masterPlayer"]),
  methods: {
    handlePick: function(card) {
      this.$socket.emit("round_winner", card);
    }
  }
};
</script>

<style scoped>
.whiteCards {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-content: center;
  width: 100%;
  height: 50%;
  background-color: green;
}

.container {
  width: 100vw;
  height: 100vh;
}
</style>