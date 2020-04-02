<template>
  <div class="container">
    <div class="username">
      Username: <span class="bold">{{ this.username }}</span>
    </div>
    <div class="blackCard">
      <Card color="black" :text="this.blackCard" />
    </div>
    <div class="whiteCards">
      <Card
        :key="key"
        v-for="(card, key) in this.whiteCards"
        :text="card"
        color="white"
      />
    </div>
  </div>
</template>

<script>
import cards from "../assets/cards.json";
import Card from "../components/Card.vue";
let pickBlackCard = () => {
  let random = Math.random() * (10 - 0) + 0;
  return cards.blackCards[Math.round(random)].text;
};

let pickWhiteCards = () => {
  let wCards = [];
  for (let i = 0; i < 10; i++)
    wCards.push(
      cards.whiteCards[Math.floor(Math.random() * cards.whiteCards.length)]
    );
  return wCards;
};
export default {
  props: ["username"],
  data() {
    return {
      allWhiteCards: cards.whiteCards,
      allBlackCards: cards.blackCards,
      blackCard: pickBlackCard(),
      whiteCards: pickWhiteCards()
    };
  },
  components: {
    Card
  }
};
</script>

<style scoped>
.blackCard {
  display: flex;
  justify-content: center;
  align-items: center;
}

.whiteCards {
  display: flex;
  flex-flow: row wrap;
  padding: 0 2em;
  margin: 2em 0;
  justify-content: center;
  align-items: center;
}

.whiteCards .card {
  margin: 0.3em;
}

.container {
  padding: 1em;
}

.username {
  text-align: left;
  font-size: 2em;
}

.bold {
  font-weight: bolder;
}
</style>
