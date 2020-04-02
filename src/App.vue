<template>
  <div id="app">
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
import Card from "./components/Card.vue";
import cards from "./assets/cards.json";

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
  name: "App",
  components: {
    Card
  },
  data() {
    return {
      allWhiteCards: cards.whiteCards,
      allBlackCards: cards.blackCards,
      blackCard: pickBlackCard(),
      whiteCards: pickWhiteCards()
    };
  }
};
</script>

<style>
body {
  background-color: #e0e0e0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

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
  margin: 1em;
}
</style>
