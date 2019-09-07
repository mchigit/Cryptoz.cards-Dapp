<template>
  
  <b-row>
    <b-col>
      <p><img class="czxp-logo" src="static/czxp.png" /> <strong>{{total_czxp_supply}} CZXP tokens</strong> in the Universe</p>
    </b-col>
    <b-col>
      <p><strong>{{total_types_supply}} Cryptoz Types</strong> in the Universe</p>
    </b-col>
    <b-col>
      <p><strong>{{total_cryptoz_supply}} Cryptoz Cards</strong> in the Universe</p>
    </b-col>
  </b-row>
  
</template>
<script>
  import {UniverseBalances} from 'vuex'
  
  export default {
    name: 'UniverseBalances',
    computed: {
      universeBalances() {
        return this.$store.state.universeBalances;
      },
      boosters_owned(){
        return this.$store.state.boostersOwned;
      },
      cards_owned(){
        return this.$store.state.cardsOwned;
      },
      czxp_balance(){
        return this.$store.state.czxpBalance;
      },
      coinbase() {
        return this.$store.state.web3.coinbase;
      },
    },
    data (){
      return {
      }
    },
    watch: {
      universeBalances(newValue, oldValue) {
        console.log(`Updating universeBalances from ${oldValue} to ${newValue}`);
  
        // new balances.. reset Universe totals
        if (newValue !== oldValue) {
          this.setSubscriptions();
        }
      },
    },
    methods : {
      setSubscriptions : function() {
        console.log("Set the Universe balances...");
  
        Cryptoz.deployed().then(function(instance) {
          return instance.getTotalTypes.call();
        }).then(this.handleTotalTypes)
        
        CzxpToken.deployed().then(function(instance) {
          return instance.totalSupply.call();
        }).then(this.handleSetCZXPSupply) //update boosters owned and total types
        
        Cryptoz.deployed().then(function(instance) {
          return instance.totalSupply.call();
        }).then(this.handleSetCryptozSupply)
        
      },
      handleTotalTypes: function(_total){
        console.log('Updating total types...');
        this.total_types_supply = parseInt(_total).toLocaleString();
        //Update our state
        this.$store.dispatch('updateTypesTotal')
      },
      // DONT DELETE !! THESE ARE SUPPLY TOTALS
      handleSetCZXPSupply :  function(_totalSupply) {
        console.log('Handling set Total czxp supply');
        this.total_czxp_supply = parseInt(_totalSupply).toLocaleString();
      },
      handleSetCryptozSupply :  function(_totalSupply) {
        console.log('Handling set Total cryptoz supply');
        this.total_cryptoz_supply = parseInt(_totalSupply).toLocaleString();
      },
    }
  }
</script>
<style scoped>
  .czxp-logo {
    width : 9%;
  }
</style>