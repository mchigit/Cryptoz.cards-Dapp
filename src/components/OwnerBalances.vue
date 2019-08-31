<template>
  
  <b-row>
    <b-col>
      <strong>Your Boosters :</strong> {{boosters_owned}}
    </b-col>
    <b-col>
      <strong>Your Cryptoz:</strong> {{cards_owned}}
    </b-col>
    <b-col>
      <strong>Your CZXP Balance :</strong> {{czxp_balance}}
    </b-col>
  </b-row>
  
</template>
<script>

  export default {
    name: 'OwnerBalances',
    computed: {
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
    mounted () { //Initialize the component
      console.log('getOwnerBalances Action dispatched from OwnerBalances.vue')
      //this.$store.dispatch('getOwnerBalances')
      this.setSubscriptions();
    },
    data () {
      return {
        
      }
    },
    methods : {
      setSubscriptions : function() {
        var self = this;
        
        CzxpToken.deployed().then(function(instance) {
          return instance.balanceOf(self.coinbase);
        }).then(this.setCzxpBalance)
        
        Cryptoz.deployed().then(function(instance) {
          console.log("get cryptoz cards tokens balance...");
          return instance.balanceOf(self.coinbase);
        }).then(this.setCryptozBalance)
        
        Cryptoz.deployed().then(function(instance) {
          return instance.boosterPacksOwned(self.coinbase);
        }).then(this.setBoostersOwned)
      },
      setCzxpBalance :  function(bal){
        //console.log(bal.toString());
        //this.czxp_balance = parseInt(bal).toLocaleString();
        this.$store.dispatch('updateCZXPBalance', parseInt(bal).toLocaleString())
      },
      setCryptozBalance : function(bal) {
        //console.log(bal.toString());
        //this.cards_owned = parseInt(bal).toLocaleString();
        this.$store.dispatch('updateCardsOwned', parseInt(bal).toLocaleString())
      },
      setBoostersOwned : function(_total){
        console.log('Updating Boosters owned...');
        //console.log(_total);
        //this.boosters_owned = parseInt(_total).toLocaleString();
        this.$store.dispatch('updateBoostersOwned', parseInt(_total).toLocaleString())
      },
    }
  }
  
</script>
<style scoped>


</style>