<template>
  <div v-if="masterPlayer.username !== currentUser.username && this.blackCard == undefined">
    <h1>Waiting for the master player to pick a black card</h1>
  </div>
  <div
    v-else-if="masterPlayer.username !== currentUser.username && this.blackCard !== undefined"
    class="container"
  >
    <div class="header">
      <div class="timer">{{timer}}</div>
      <div class="blackCard">
        <Card color="black" :pick="this.blackCard.pick" :text="this.blackCard.text" />
      </div>
      <div class="users">
        <p>Players:</p>
        <ul class="players">
          <li
            :class="player.username === currentUser.username ? 'bold' : ''"
            :key="index"
            v-for="(player, index) in allUsers"
          >{{ player.username }}</li>
        </ul>
      </div>
    </div>

    <div class="whiteCards">
      <Card
        @picked="handlePick"
        :key="key"
        v-for="(card, key) in this.whiteCards"
        :text="card"
        color="white"
      />
    </div>
  </div>

  <div v-else>
    <h1>Waiting for the other players to choose a card</h1>
  </div>
</template>

<script>
import cards from "../assets/cards.json";
import Card from "../components/Card.vue";
import { mapGetters, mapActions } from "vuex";
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
      whiteCards: pickWhiteCards(),
      pickedCard: null
    };
  },
  components: {
    Card
  },
  computed: mapGetters([
    "blackCard",
    "currentUser",
    "allUsers",
    "timer",
    "masterPlayer"
  ]),
  methods: {
    ...mapActions(["cardPicked"]),
    handlePick: function(card) {
      this.cardPicked(card);
      this.$socket.emit("card_picked", card);
    }
  }
};
</script>

/* Styling */
<style scoped>
.blackCard {
  display: flex;

  justify-content: center;
  align-items: center;
  margin-left: auto;
  grid-area: card;
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

.header {
  display: grid;
  grid-template-columns: repeat(5, auto);
  grid-template-areas: " . users card timer ";
  padding: 0 2em;
}

.users {
  grid-area: users;
  margin: 0 1em;
  font-size: 2em;
  text-align: left;
}

.users ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.timer {
  font-size: 3.5em;
  grid-area: timer;
}

.bold {
  font-weight: bolder;
}

@media (max-width: 700px) {
  .header {
    grid-template-columns: repeat(3, 1fr);
    grid-template-areas: "card users timer";
    margin: 0 2.7em;
  }

  .users {
    font-size: 1.5em;
  }
}

@media (max-width: 700px) and (orientation: landscape) {
  .card {
    height: 30vw;
    width: 15vw;
  }
}

@media (max-width: 400px) {
  .card {
    height: 30vh;
    width: 15vh;
    font-size: 1em;
  }
  .header {
    font-size: 0.7em;
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas: "card users timer";
  }

  .whiteCards {
    padding: 0;
    width: 100%;
  }
}
</style>
