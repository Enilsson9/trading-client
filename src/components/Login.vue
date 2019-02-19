<template>
<main>
  <Nav />
  <div>
      <h1>Login</h1>
      <input v-model="email" type="email" placeholder="Email" required><br>
      <input v-model="password" type="password" placeholder="Password" required> <br>
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
          localStorage.setItem('id_token', result.data.data.token)
          //redirect
          this.$router.push("report")
          // eslint-disable-next-line
          console.log(result.data.data.token);
        })
        .catch((err) => {
          // eslint-disable-next-line
          console.log("Could not log in", err);
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
