<template>
<nav>
    <ul>
        <li><router-link to="/">Me</router-link></li>
        <li><router-link to="/reports/kmom01">kmom01</router-link></li>
        <li><router-link to="/reports/kmom02">kmom02</router-link></li>
        <li><router-link to="/reports/kmom03">kmom03</router-link></li>
        <li><router-link to="/reports/kmom04">kmom04</router-link></li>
        <li><router-link to="/reports/kmom05">kmom05</router-link></li>
        <li><router-link to="/reports/kmom06">kmom06</router-link></li>
        <li><router-link to="/report" v-if="isLogged">Add</router-link></li>
        <li><router-link to="/update" v-if="isLogged">Update</router-link></li>
        <li><router-link to="/register" v-if="!isLogged">Register</router-link></li>
        <li><router-link to="/login" v-if="!isLogged">Login</router-link></li>
        <li><router-link to="/logout" v-if="isLogged">Logout</router-link></li>
        <li><router-link to="/chat">Chat</router-link></li>
    </ul>
</nav>
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
    color: white;
    font-size: 1.4em;
}

li a:hover {
    text-decoration: underline;
}
</style>
