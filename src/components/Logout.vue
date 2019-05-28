<template>
<main>
    <div class="container">
        <Nav />
        <div>
            <h1>Log out</h1>
            <p>Click button to logout</p>
            <button @click="submit">Log out</button>
        </div>
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
