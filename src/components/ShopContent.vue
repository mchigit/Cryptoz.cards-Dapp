<template>
  <div>
        
        <main role="main" class="container">
        <div class="jumbotron">
          <h1>Shop</h1>
          <p>The Shop is a place to mint limited edition Cryptoz Cards. Some cards are free, some have a cost. You may also buy a booster card, which will randomly mint an unlimited edition card</p>
            <p>There are a total of <strong>{{total_supply}} Cryptoz Types</strong> in the Universe</p>
          <div class="row">
            <div class="col">
              <button class="btn btn-danger" v-on:click="buyBooster">Buy Booster Card 0.01E</button>
            </div>
            <div class="col"><strong>Your Boosters :</strong> {{boosters_owned}}
            </div>
            <div class="col"><strong>Your CZXP Balance :</strong> {{czxp_balance}}
            </div>
          </div>
          <br>
          <p>Sort | Search | Claim Free Cards</p>
          <br>
          <div class="row">
              <OwnedCardContent
                v-for="card in storeCards" :key="card.id"
                :id="card.id"
                :name="card.name"
                :cost="card.attributes.cost"
                :cset="card.attributes.card_set"
                :edition_total="card.attributes.edition_total"
                :level="card.attributes.card_level"
                :unlock_czxp="card.attributes.unlock_czxp"
                :buy_czxp="card.attributes.buy_czxp"
                :transfer_czxp="card.attributes.transfer_czxp"
                :sacrifice_czxp="card.attributes.sacrifice_czxp"
                :image="card.image"
                :card_class="card.attributes.rarity"
              ></OwnedCardContent>
          </div>
          
        </div>
      </main>
  </div>
</template>

<script>
import OwnedCardContent from '@/components/OwnedCardContent.vue'


export default {
  name: 'ShopContent',
  components : {
    OwnedCardContent
  },
  data () {
    return {
      total_supply : 'Loading...',
      boosters_owned : 'Loading...',
      czxp_balance : 'Loading...',
      storeCards: []
    }
  },
  mounted () {
    console.log('The shop is mounted, call for the cards');
    this.setSubscriptions();
  },
  methods : {
    buyBooster : function() {
      console.log('Buy booster called..');
      
      Cryptoz.deployed().then(function(instance) {
        return instance.buyBoosterCard(1, {from: account, value:2000000000000000});
      //}).then(this.handleBuyBooster)
      }).then(this.handleBuyBooster) //update boosters owned and total types
      
    },
    handleBuyBooster : function(result) {
      console.log('Handling buy booster');
      this.setSubscriptions();
    },
    setSubscriptions : function() {
      
      Cryptoz.deployed().then(function(instance) {
        return instance.getTotalTypes();
      }).then(this.setTotalSupply)
      
      Cryptoz.deployed().then(function(instance) {
        return instance.boosterPacksOwned(account);
      }).then(this.setBoostersOwned)
      
      CzxpToken.deployed().then(function(instance) {
        return instance.balanceOf(account);
      }).then(this.setCzxpBalance)
      
    },
    setTotalSupply: function(_total){
      console.log('Updating total types...');
      this.total_supply = _total.toString();
    },
    setBoostersOwned : function(_total){
      console.log('Updating Boosters owned...');
      //console.log(_total);
      this.boosters_owned = _total.toString();
    },
    setCzxpBalance :  function(bal){
      //console.log(bal.toString());
      this.czxp_balance = bal.toString();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>