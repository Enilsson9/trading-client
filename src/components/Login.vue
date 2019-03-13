<template>
<main>
  <Nav />
  <div>
      <h1>Login</h1>
      <input v-model="email" type="email" placeholder="Email" required><br>
      <input v-model="password" type="password" placeholder="Password" required> <br><br>
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
      email: '',
      password: ''
    }
  },
  methods: {
    submit() {
      const body = 'email=' + this.email + '&password=' + this.password;

      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }

      axios.post('https://me-api.edwardnilsson.se/login', body, config)
        .then((result) => {
          //save token
          localStorage.setItem('id_token', result.data.data.token);
          //redirect
          this.$router.push("report");
        })
        .catch((err) => {
          // eslint-disable-next-line
          console.log("Could not log in", err);
          localStorage.removeItem('id_token');
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


button {
  background-color: blue; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 20px;
}

</style>
