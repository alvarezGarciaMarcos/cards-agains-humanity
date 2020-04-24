<template>
  <div
    @click="myFilter"
    class="card"
    :class="[this.color ? this.color : '', this.disabled && this.color !== 'black' ? 'disabled' : '']"
  >
    <div disabled class="body">
      <p>{{ text }}</p>
      <div class="pick" v-if="this.color === 'black' && this.pick > 1">{{ "Pick " + this.pick }}</div>
    </div>
  </div>
</template>

<script>
import { bus } from "../EventBus";
import { mapGetters } from "vuex";
export default {
  props: ["text", "color", "pick", "prevent", "onClick"],
  data() {
    return {
      disabled: false
    };
  },
  computed: mapGetters(["currentUser"]),
  methods: {
    myFilter: function() {
      console.log("I have been picked!");
      this.$emit("picked", { card: this.text, user: this.currentUser });
      if (!this.disabled && !this.prevent) {
        bus.$emit("picked", this.text);
      }
    }
  },
  created() {
    bus.$on("picked", text => {
      if (text !== this.text) this.disabled = true;
    });
  }
};
</script>
<style scoped>
.card {
  height: 40vh;
  width: 20vh;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0 1em;
  font-size: 1.5em;
  font-weight: bolder;
  text-align: left;
}

.black {
  background-color: black;
  color: white;
}

.white {
  background-color: white;
  color: black;
  cursor: pointer;
  transition: all 200ms ease-in;
}

.card .body {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
}

.pick {
  margin-top: auto;
  margin-bottom: 1em;
}

.white:hover,
.card.white.active {
  transform: scale(1.05);
}

.disabled {
  opacity: 0.2;
}
</style>
