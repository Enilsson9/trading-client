<template>
<main>
    <Nav />
    <h2>{{ $route.params.kmom }}</h2>
    <div v-cloak>
      <p>{{ answer }}</p>
    </div>
</main>

</template>

<script>
import Nav from './Nav.vue'
import axios from 'axios';

export default {
  name: 'Report',
  components: {
    Nav,
  },
  data() {
    return {
      answer: []
    }
  },
  watch: {
   '$route.params.kmom': function (kmom) {
      axios.get('https://me-api.edwardnilsson.se/reports/' + kmom)
      .then(res => this.answer = res.data.data.msg)
    }
  },
  mounted() {
    this.getReport(this.$route.params.kmom);
  },
  methods: {
    getReport(kmom) {
      axios.get('https://me-api.edwardnilsson.se/reports/' + kmom)
      .then(res => this.answer = res.data.data.msg)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
  text-transform: uppercase;
}

p {
  white-space: pre-line;
  font-size: 1.25em;
}
.question {
  margin-bottom: 2em;
}

[v-cloak] {
  display: none;
}
</style>
