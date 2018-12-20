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
              <router-link to="/market">Markets</router-link>
            </li>
          </ul>
          <transition name="fade" mode="out-in">
          <button class="btn btn-danger" v-if="showLogin === 1" v-on:click="doLogin">Log in to MetaMask</button>
            <span class="wallet-nav" v-else><strong>ETH Wallet :</strong> {{wallet}}</a></span>
          </transition>
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
      msg: 'This is the header',
      showLogin : 1,
      wallet : ''
    }
  },
  methods : {
    doLogin : function () {
      console.log('Call eth provider.enable()');
      this.showLogin = 0; //Hide button, show account
      this.wallet = '0x7cacD241269B40213a9f12dE1478AcBe5bc2e428';
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .logo-nav{
    margin-right: 1.6em;
  }

  .wallet-nav{
    color: #fff;
    margin-right: 150px;
  }
  li{
    margin-right: 1.2em;
  }
  a{
    padding:5px;
  }
  
  a:hover{
    color:#FFF;
    text-decoration: none;
    border: 1px solid #fff;
    padding:4px;
  }
  
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>