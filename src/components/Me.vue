<template>
<div class="container">
    <div class="row">
        <div class="two columns">
            <Nav />
        </div>

        <div class="four columns">
            <p><strong>User:</strong> {{ text.user }}</p>
        </div>
    </div>


    <h1>Stats</h1>
    <p><strong>Funds:</strong> {{ text.funds }}</p>
    <p><strong>Stocks:</strong>  {{ text.stocks }}</p>
    <p><strong>Current Price:</strong>  {{ currentPrice }}</p>

      <div class="row">
          <div class="four columns">
              <input v-model="buy" type="number" placeholder="Buy" required><br>
              <button @click="buyStock">Buy</button>
          </div>

          <div class="four columns">
              <input v-model="sell" type="number" placeholder="Sell" :max="text.stocks" required><br>
              <button @click="sellStock">Sell</button>
          </div>

          <div class="four columns">
              <input v-model="funds" type="number" placeholder="Add funds" :max="text.stocks" required><br>
              <button @click="addFunds">Add funds</button>
          </div>
      </div>


      <div id="graphic"></div>
</div>
</template>

<script>
import Nav from './Nav.vue'
import axios from 'axios';

import io from 'socket.io-client';
import Rickshaw from 'rickshaw';
import 'rickshaw/rickshaw.min.css';

export default {
  name: 'Me',
  props: { },
  components: {
      Nav,
  },
  data() {
    return {
        text: "",
        socket: io.connect("http://localhost:3000"),
        stocks: "",
        currentPrice: "",
        sell: "",
        buy: "",
        funds: "",
        maxStocks: "",
        email: localStorage.getItem('local_email'),
        currentToken: localStorage.getItem('id_token'),
        message: "",
        logs: []
    }
  },
  mounted() {
      if (this.checkIfIsLogged()) {
          this.getData();

          var graphs = {};
          var first = true;
          var graphContainer = document.getElementById("graphic");

          this.socket.on('stocks', (message) => {
              if (first) {
                  var palette = new Rickshaw.Color.Palette({ scheme: 'spectrum14' });

                 message.map((cake) => {

                      let graphElement = document.createElement("div");

                      graphContainer.appendChild(graphElement);


                      let graph = new Rickshaw.Graph({
                          element: graphElement,
                          width: "500",
                          height: "300",
                          renderer: "line",
                          series: new Rickshaw.Series.FixedDuration([{
                              name: cake.name,
                              color: palette.color(),
                          }], undefined, {
                              timeInterval: 1000,
                              maxDataPoints: 1000,
                              timeBase: new Date().getTime() / 1000
                          })
                      });

                      var resize = function() {
                           graph.configure({
                               width: window.innerWidth * 0.5,
                               height: window.innerHeight * 0.5
                           });
                           graph.render();
                      }

                      window.addEventListener('resize', resize);
                      resize();

                      graph.configure({
                          width: graphContainer.clientWidth,
                      });

                      new Rickshaw.Graph.Axis.Time( { graph: graph } );

                      new Rickshaw.Graph.Axis.Y({
                          graph: graph,
                          orientation: 'left',
                          tickFormat: Rickshaw.Fixtures.Number.formatKMBT
                      });

                      new Rickshaw.Graph.HoverDetail({
                          graph: graph
                      });

                      graph.render();

                      let slug = this.slugify(cake.name);

                      graphs[slug] = {
                          name: cake.name,
                          graph: graph,
                      };
                  });
                  first = false;



              }


              message.map((cake) => {
                let slug = this.slugify(cake.name);
                let data = {};

                this.currentPrice = cake.startingPoint;

                data[cake.name] = cake.startingPoint;

                graphs[slug].graph.series.addData(data);
                graphs[slug].graph.render();
              });
          });






      } else {
          //redirect
          this.$router.push("login");
      }
  },
  methods: {

    buyStock() {
        const shop = (parseFloat(this.buy) * parseFloat(this.currentPrice));

        if (shop > parseFloat(this.text.funds) || !this.buy) {
            alert("not possible");
            return;
        }

        const body = 'email=' + this.email +
        '&stocks=' + (parseFloat(this.text.stocks) + parseFloat(this.buy)) +  '&price=' +
        (parseFloat(this.text.funds) - (parseFloat(this.buy) * parseFloat(this.currentPrice)));

        const config = {
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'x-access-token': this.currentToken
            }
        }

        axios.post('http://localhost:8333/update', body , config)
        .then((result) => {
          // eslint-disable-next-line
          this.getData();
          // eslint-disable-next-line
          console.log(result);

        })
        .catch((err) => {
          // eslint-disable-next-line
          console.log("Could not get data", err);
        })
    },

    sellStock() {
        const shop = parseFloat(this.sell);

        if (shop > parseFloat(this.text.stocks) || !this.sell) {
            alert("not possible");
            return;
        }

        const body = 'email=' + this.email +
        '&stocks=' + (parseFloat(this.text.stocks) - parseFloat(this.sell)) +  '&price=' +
        (parseFloat(this.text.funds) + (parseFloat(this.sell) * parseFloat(this.currentPrice)));

        const config = {
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'x-access-token': this.currentToken
            }
        }
        axios.post('http://localhost:8333/update', body, config)
        .then((result) => {
            this.getData();
            // eslint-disable-next-line
            console.log(result);

        })
        .catch((err) => {
          // eslint-disable-next-line
          console.log("Could not get data", err);
        })
    },

    addFunds() {
        if (!this.funds) {
            alert("not possible");
            return;
        }
        //remove later
        if (!this.text.stocks) {
            this.text.stocks = 0;
        }

        if (!this.text.funds) {
            this.text.funds = 0;
        }

        const config = {
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'x-access-token': this.currentToken
            }
        };

        const body = 'email=' + this.email +
        '&stocks=' + this.text.stocks +  '&price=' + (parseFloat(this.text.funds) + parseFloat(this.funds));

        axios.post('http://localhost:8333/update', body, config)
        .then((result) => {
            this.getData();
            // eslint-disable-next-line
            console.log(result);

        })
        .catch((err) => {
          // eslint-disable-next-line
          console.log("Could not get data", err);
        })
    },

    getData() {
        const config = {
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'x-access-token': this.currentToken
            }
        }

        axios.post('http://localhost:8333/data', 'email=' + localStorage.getItem('local_email'), config)
        .then((result) => {
          this.text = result.data
        })

        .catch((err) => {
          // eslint-disable-next-line
          console.log("Could not get data", err);
        })
    },
    slugify(text) {
        return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w-]+/g, '')       // Remove all non-word chars
        .replace(/--+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
    },
    checkIfIsLogged() {
        let token = localStorage.getItem('id_token');
        return token;
    }
  }
}
</script>
