<template>
<main>
  <Nav />
  <div>
      <h1>Add</h1>
      Kmom: <input v-model="kmom" type="number" placeholder="1"><br>
      Content: <input v-model="content" type="text" placeholder="Your report here"> <br>
      <button @click="submit">Submit</button>
  </div>
</main>
</template>

<script>
import Nav from './Nav.vue'
import axios from 'axios';

export default {
  name: 'Login',
  props: { },
  components: {
      Nav,
  },
  data() {
    return {
      kmom: '',
      content: ''
    }
  },
  methods: {
    submit() {
      const body = 'kmom=' + this.kmom + '&content=' + this.content
      const currentToken = localStorage.getItem('id_token');
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-access-token': currentToken
        }
      }

      axios.post('https://me-api.edwardnilsson.se/reports', body, config)
        .then((result) => {
          // eslint-disable-next-line
          console.log(result);

        })
        .catch((err) => {
          // eslint-disable-next-line
          console.log("Could not send report", err);
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
