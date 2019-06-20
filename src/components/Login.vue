<template>
<main>
  <Nav />
  <div class="container">
      <h1>Login</h1>
      <form v-on:submit.prevent="submit">
          <input v-model="email" type="email" placeholder="Email" required><br>
          <input v-model="password" type="password" placeholder="Password" required> <br><br>
          <button type="submit">Submit</button>
      </form>

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

      axios.post('https://project-api.edwardnilsson.se/login', body, config)
        .then((result) => {
          //save token
          localStorage.setItem('id_token', result.data.data.token);
          //save email
          localStorage.setItem('local_email', this.email);
          //redirect
          this.$router.push("/");
        })
        .catch((err) => {
          // eslint-disable-next-line
          console.log("Could not log in", err);
          localStorage.removeItem('id_token');
          localStorage.removeItem('local_email');
        })
    }
  }
}
</script>
