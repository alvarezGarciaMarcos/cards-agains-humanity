<template>
  <div class="card-container">
    <Card
      class="pointer"
      :key="key"
      v-for="(card, key) in this.blackCards"
      color="black"
      :text="card.text"
      :pick="card.pick"
      prevent
      @click.native="setBk(key)"
    />
  </div>
</template>

<script>
import cards from "../assets/cards.json";
import Card from "../components/Card.vue";
import { mapActions } from "vuex";
let pickBlackCards = () => {
  let bCards = [];
  for (let i = 0; i < 10; i++)
    bCards.push(
      cards.blackCards[Math.floor(Math.random() * cards.blackCards.length)]
    );
  return bCards;
};
export default {
  components: {
    Card
  },
  data() {
    return {
      blackCards: pickBlackCards()
    };
  },
  methods: {
    ...mapActions(["setBlackCard"]),
    setBk: function(key) {
      let card = JSON.parse(JSON.stringify(this.blackCards[key]));
      this.$socket.emit("black_card_set", card);
      this.$router.push({
        name: "game"
      });
    }
  }
};
</script>

<style scoped>
.card-container {
  margin: 0 auto;
  display: flex;
  flex-flow: row wrap;
}

.card-container .card {
  margin: 1em;
}

.pointer {
  cursor: pointer;
}
</style>