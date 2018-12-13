<template>
  <div id="app">
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <img class="logo-nav" src="./assets/cryptokeeper_logo.svg" width="4%" />
        <a class="navbar-brand" href="index.php">Cryptoz</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item<?= (basename($_SERVER['PHP_SELF']) == 'shop.php' ? ' active' : '') ?>">
              <a class="nav-link" href="shop.php">Shop</a>
            </li>
            <li class="nav-item<?= (basename($_SERVER['PHP_SELF']) == 'login.php' ? ' active' : '') ?>">
              <a class="nav-link" href="login.php">My Crypt</a>
            </li>
            <li class="nav-item<?= (basename($_SERVER['PHP_SELF']) == 'market.php' ? ' active' : '') ?>">
              <a class="nav-link" href="market.php">Market</a>
            </li>
          </ul>
          <span class="wallet-nav">ETH Wallet : <a href="https://etherscan.io/address/0x7cacD241269B40213a9f12dE1478AcBe5bc2e428" target="_blank">0x7cacD241269B40213a9f12dE1478AcBe5bc2e428</a></span>
          <span class="nav-item<?= (basename($_SERVER['PHP_SELF']) == 'help.php' ? ' active' : '') ?>">
            <a class="nav-link" href="help.php">Help</a>
          </span>
        </div>
      </nav>
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