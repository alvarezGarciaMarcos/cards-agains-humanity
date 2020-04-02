<template>
  <div
    class="card"
    :class="[this.color ? this.color : '', this.isActive ? 'active' : '']"
    @click="this.myFilter"
  >
    <div class="body">
      <p>{{ text }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: String,
    color: String
  },
  data() {
    return {
      isActive: false
    };
  },
  methods: {
    myFilter: function() {
      this.isActive = !this.isActive;
    }
  }
};
</script>
<style scoped>
.card {
  height: 350px;
  width: 200px;
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

.white:hover,
.card.active {
  transform: scale(1.05);
}
</style>
