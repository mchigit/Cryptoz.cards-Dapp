<template>
  <div id="app">
    <AppHeader/>
    <transition name="component-fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <AppFooter/>
  </div>
</template>

<script>
import BodyContent from './components/BodyContent'
import AppHeader from './components/layout/AppHeader'
import AppFooter from './components/layout/AppFooter'

// Import our contract artifacts and turn them into usable abstractions.
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
  methods : {
    init :  function() {
      console.log('Starting up the app..');
      // Cryptoz is our usable abstraction, which we'll use through the code below
      var Cryptoz   = contract(cryptoz_artifacts);
      var CzxpToken = contract(cryptoz_token_artifacts);
      Cryptoz.setProvider(web3.currentProvider);
      CzxpToken.setProvider(web3.currentProvider);
    }
  }
}
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
