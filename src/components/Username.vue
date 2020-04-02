<template>
  <form @submit.prevent="onSubmit">
    <label for="username">Username</label>
    <input
      v-model="user.username"
      id="username"
      type="text"
      placeholder="Enter your username"
    />
  </form>
</template>
<script>
export default {
  props: ["socket"],
  methods: {
    onSubmit() {
      this.$socket.emit("username_set", this.user.username);
      this.$router.push({
        name: "game",
        params: { username: this.user.username }
      });
    }
  },
  data() {
    return {
      user: {
        username: ""
      }
    };
  }
};
</script>
<style scoped>
form {
  display: flex;

  justify-content: center;
  align-items: center;
  height: 100vh;

  margin: 0;
  padding: 0;
  font-size: 5em;
}

form input {
  font-size: 1em;
  border-radius: 30px;
  border: none;
  padding: 0.3em;
  transition: all 200ms ease-in-out;
}

form input:focus {
  outline: none;
  transform: scale(1.1);
}

form label {
  margin-right: 1em;
}
</style>
