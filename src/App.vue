<template>
  <div id="app">
    <AppHeader v-on:doLogin="onDoLogin" />
    <transition name="component-fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <AppFooter v-bind:network_name="network_name" />
  </div>
</template>

<script>
import BodyContent from './components/BodyContent'
import AppHeader from './components/layout/AppHeader'
import AppFooter from './components/layout/AppFooter'

// Import our contract artifacts and turn them into usable abstractions.
import { default as Web3} from 'web3';
var contract = require("truffle-contract");
import cryptoz_artifacts from './contracts/Cryptoz.json'
import cryptoz_token_artifacts from './contracts/CzxpToken.json'

export default {
  name: 'App',
  components: {
    BodyContent,
    AppHeader,
    AppFooter
  },
  mounted() {
    this.init()
  },
  data() {
    return {
      network_name : 'Detecting Ethereum network..Loading'
    }
  },
  methods : {
    init :  function() {
      console.log('Starting up the app..');
      // Cryptoz is our usable abstraction, which we'll use through the code below
      var Cryptoz   = contract(cryptoz_artifacts);
      var CzxpToken = contract(cryptoz_token_artifacts);
      Cryptoz.setProvider(web3.currentProvider);
      CzxpToken.setProvider(web3.currentProvider);
    },
    onDoLogin : function () {
      // Modern dapp browsers...
      console.log("Get ready to ask permission..");

      if (window.ethereum) {
          window.web3 = new Web3(ethereum);
        
          //Check what network we are on, "main"
          web3.eth.net.getNetworkType()
          .then(console.log);
    
          try {
              // Request account access if needed
              ethereum.enable();
              // Acccounts now exposed
              console.log("App.start being called...");
              App.start();
          } catch (error) {
              // User denied account access...
              console.log("User denied our app, that is sad");
              //console.log(error);
          }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
          window.web3 = new Web3(web3.currentProvider);
          // Acccounts always exposed
          //web3.eth.sendTransaction({/* ... */});
          App.start();
      }
      // Non-dapp browsers...
      else {
          console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
    },
    networkDetected :  function(val) {
      console.log('hey theres a network !:' + val);
    }
  } //methods
}

window.addEventListener('load', async () => {
    // Modern dapp browsers...
    console.log("Get ready to ask permission..");

    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        
        //Check what network we are on, "main"
        web3.eth.net.getNetworkType()
        .then(console.log);
    }else{
      // There is no metamask
      console.log('show metamask link');
    }
})
</script>

<style>
  .jumbotron{
    margin-top:6em;
  }
  
  .component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .3s ease;
  }
  .component-fade-enter, .component-fade-leave-to
    /* .component-fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
