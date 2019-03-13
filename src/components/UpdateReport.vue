<template>
<main>
  <Nav />
  <div>
      <h1>Update</h1>
      <h3>Kmom:</h3><input v-model="kmom" type="number" placeholder="0"><br>
      <h3>Content:</h3><textarea v-model="content" type="text" rows="10" cols="75" placeholder="Your report here"></textarea>
      <br>
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

      axios.post('https://me-api.edwardnilsson.se/reports/update', body, config)
        .then((result) => {
          // eslint-disable-next-line
          console.log(result);

        })
        .catch((err) => {
          // eslint-disable-next-line
          console.log("Could not update report", err);
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

button {
  background-color: green; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 20px;
}

</style>
