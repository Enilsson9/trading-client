<template>
    <div class="container">
        <nav>
            <ul>
                <li><router-link to="/register" v-if="!isLogged">Register</router-link></li>
                <li><router-link to="/login" v-if="!isLogged">Login</router-link></li>
                <li><router-link to="/logout" v-if="isLogged">Logout</router-link></li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
  name: 'Nav',
  props: { },
  data () {
    return {
      isLogged: this.checkIfIsLogged()
    }
  },
  methods: {
    checkIfIsLogged() {
      let token = localStorage.getItem('id_token');
      return token;
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
    list-style-type: none;
}

li {
    display: inline;
    margin-right: 1em;
}

li a {
    text-decoration: none;
    color: gray;
    font-size: 1.4em;
}

li a:hover {
    text-decoration: underline;
}
</style>
