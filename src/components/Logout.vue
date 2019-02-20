<template>
<main>
  <Nav />
  <div>
      <h1>Log out</h1>
      <p>Click button to logout</p>
      <button @click="submit">Log out</button>
  </div>
</main>
</template>

<script>
import Nav from './Nav.vue'

export default {
  name: 'Login',
  props: { },
  components: {
      Nav,
  },
  methods: {
    submit() {
        localStorage.removeItem('id_token');
        this.$router.push("/");
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
