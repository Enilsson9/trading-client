<template>
<main>
    <Nav />
      <h1>Me</h1>
      <p>{{ text.msg }}</p>
      <p><img src="../assets/me-2019.png" style="width: 250px" class="img-fluid img-thumbnail"></p>
</main>
</template>

<script>
import Nav from './Nav.vue'
import axios from 'axios';

export default {
  name: 'Me',
  props: { },
  components: {
      Nav,
  },
  data() {
    return {
        text: ""
    }
  },
  mounted() {
    this.getMe();
  },
  methods: {
    getMe() {
      axios.get('https://me-api.edwardnilsson.se/')
      .then(res => this.text = res.data.data)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
