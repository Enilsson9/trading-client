<template>
<main>
  <Nav />
  <div class="container">
      <h1>Register</h1>
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

      axios.post('https://project-api.edwardnilsson.se/register', body, config)
        .then((result) => {
          // eslint-disable-next-line
          console.log(result);
          //redirect
          this.$router.push("login")
        })
        .catch((err) => {
          // eslint-disable-next-line
          console.log("Could not register", err);
        })
    }
  }
}
</script>
