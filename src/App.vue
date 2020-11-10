<template>
  <div id="app">
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Footer from "./components/Footer.vue";

export default {
  components: {
    Footer,
  },
};
</script>

<style>
#app {
  display: grid;
  grid-template-rows: 1fr auto;
  height: 100vh;
  font-family: "Montserrat", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.router-link-exact-active {
  font-weight: 700;
}

.v-toast--top {
  margin-top: 1rem;
  margin-right: 1rem;
}
</style>
