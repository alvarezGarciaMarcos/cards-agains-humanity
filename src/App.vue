<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  sockets: {
    new_user: function(username) {
      console.log(username);
    },
    connection: function() {
      console.log("connected");
    }
  }
};
</script>

<style>
body,
html {
  background-color: #e0e0e0;
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100vw;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
