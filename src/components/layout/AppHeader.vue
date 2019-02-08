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
              <router-link to="/crypt">Your Crypt</router-link>
            </li>
            <li>
              <router-link to="/market">Markets</router-link>
            </li>
            <li>
              <router-link to="/view/2">View</router-link>
            </li>
          </ul>
          
          <transition name="fade" mode="out-in">
            
            <p class="mm-header" v-if="network_state === 0">
              Metamask is <strong>required</strong> to bridge Cryptoz on Ethereum
              <a href="https://metamask.io/" target="_blank">
                <img src="static/metamask_logo.png" width="40%" />
              </a>
            </p>
            
            <button class="btn btn-danger" v-else-if="network_state === 1" v-on:click="$emit('doLogin')">Connect with MetaMask</button>
            
            <span class="wallet-nav" v-else><strong>ETH Wallet :</strong> {{wallet}}</a>
            </span>
          
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
      showLogin : 1
    }
  },
  props : ['network_state','wallet'],
  methods : {

  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .router-link-active {
    color:#ffffff;
  }
  
  .mm-header {
    color: #fff;
    text-align: right;
    margin-right: 10px;
    width: 23em;
  }

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