<template>
  <form @submit.prevent="onSubmit">
    <label id="label-username" for="username">Username</label>
    <input
      required
      v-model="data.username"
      id="username"
      type="text"
      placeholder="Enter your username"
    />
    <label id="label-room" for="room">Room</label>
    <input v-model="data.room" required id="room" placeholder="The room to play" type="text" />
    <button>GO!</button>
  </form>
</template>
<script>
export default {
  props: ["socket"],
  methods: {
    onSubmit() {
      this.$socket.emit("username_set", this.data);
      this.$router.push({
        name: "lobby"
      });
    }
  },
  data() {
    return {
      data: {
        username: "",
        room: ""
      }
    };
  }
};
</script>
<style scoped>
form {
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
  height: 100vh;

  margin: 0;
  padding: 0;
  font-size: 5em;
}

button {
  margin: 1em;
  width: 30%;
  height: 10%;
  font-size: 1em;
  border-radius: 30px;
  transition: all 200ms ease-in-out;
}

button:hover {
  background-color: yellowgreen;
  cursor: pointer;
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

@media only screen and (max-width: 700px) {
  * {
    font-size: 20px;
  }
  form {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-rows: repeat(5, 1fr);
    grid-template-areas:
      ". username-label ."
      ". username-input ."
      ". room-label ."
      ". room-input ."
      ". button .";
  }

  form input {
    padding: 1em;
    margin: 0;
    align-self: flex-start;
  }

  input#username {
    font-size: 20px;

    grid-area: username-input;
  }
  input#room {
    font-size: 20px;
    grid-area: room-input;
  }

  form label {
    font-size: 0.5em;
  }

  #label-username {
    grid-area: username-label;
    align-self: flex-end;
  }

  #label-room {
    grid-area: room-label;
  }
  button {
    font-size: 25px;
    grid-area: button;
    align-self: flex-start;
    width: 100%;
    height: 50%;
    margin: 0;
  }
}
</style>
