<template>
  <div id="app">
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <img class="logo-nav" src="./assets/cryptokeeper_logo.svg" width="4%" />
        <router-link class="navbar-brand" to="/">Cryptoz</router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav mr-auto">
            <li>
              <router-link to="/shop">Shop</router-link>
            </li>
            <li>
              <router-link to="/crypt">My Crypt</router-link>
            </li>
            <li>
              <router-link to="/market">Market</router-link>
            </li>
          </ul>
          <span class="wallet-nav">ETH Wallet : <a href="https://etherscan.io/address/0x7cacD241269B40213a9f12dE1478AcBe5bc2e428" target="_blank">0x7cacD241269B40213a9f12dE1478AcBe5bc2e428</a></span>
          <span>
            <router-link to="/help">Help</router-link>
          </span>
        </div>
      </nav>
      <p></p>
      
      </div>
</template>

<script>
export default {
  name: 'AppHeader',
  data () {
    return {
      msg: 'This is the header'
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logo-nav{
  margin-right: 2%;
}

h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>