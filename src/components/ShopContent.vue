<template>
  <div>
        
        <main role="main" class="container">
        <div class="jumbotron">
          <h1>Shop</h1>
          <p>The Shop is a place to mint limited edition Cryptoz Cards. Some cards are free, some have a cost. You may also buy and open a booster card, which will randomly mint an unlimited edition card</p>
            <p>There are a total of <strong>{{total_supply}} Cryptoz Types</strong> in the Universe</p>
          <div class="row">
            <div class="col">
              <button class="btn btn-danger" v-on:click="buyBooster">Buy Booster Card 0.002E
              </button>
            </div>
            <div class="col"><strong>Your Boosters :</strong> {{boosters_owned}}
            </div>
            <div class="col"><strong>Your CZXP Balance :</strong> {{czxp_balance}}
            </div>
          </div>
          <br>
              <div>
                <div class="dropdown">
                  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Sort By
                  </button>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item" href="#" v-on:click="sortByName('name')">Name</a>
                    <a class="dropdown-item" href="#" v-on:click="sortByAttr('rarity')">Rarity</a>
                    <a class="dropdown-item" href="#" v-on:click="sortByAttr('cost')">Cost</a>
                    <a class="dropdown-item" href="#" v-on:click="sortByAttr('card_set')">Card Set</a>
                    <a class="dropdown-item" href="#" v-on:click="sortByAttr('edition_total')">Edition Total</a>
                    <a class="dropdown-item" href="#" v-on:click="sortByAttr('card_level')">Level</a>
                    <a class="dropdown-item" href="#" v-on:click="sortByAttr('unlock_czxp')">Unlock CZXP</a>
                    <a class="dropdown-item" href="#" v-on:click="sortByAttr('buy_czxp')">Buy CZXP</a>
                    <a class="dropdown-item" href="#" v-on:click="sortByAttr('transfer_czxp')">Transfer CZXP</a>
                    <a class="dropdown-item" href="#" v-on:click="sortByAttr('sacrifice_czxp')">Sacrifice CZXP</a>
                  </div>
                </div>
              </div>
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
import axios from 'axios'
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
        return instance.buyBoosterCard({from: account, value:2000000000000000});
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
      
      //Lets get all the cards now
      var self = this;
      
      //reset the view
      this.storeCards = [];
      
      for (var i = 1; i < _total; i++) {
            axios.get('https://cryptoz.cards/services/getCardData.php?card_id=' + i)
              .then(this.handleGotCardData)
      }
        
        /**
        Cryptoz.deployed().then(function(instance) {
          //now lets loop call all the Cards this user has tokens for
          for (var i = 1; i < _total; i++) {
            instance.allCardTypes.call(i).then(console.log)
          }
        })
        **/
    },
    handleGotCardData : function(res) {
      console.log(res.data);
      //Append the bg
      switch(res.data.attributes.rarity){
        case "Common":
          res.data.attributes.rarity = 'card-bg card-bg-6';
          break;
        case "Uncommon":
          res.data.attributes.rarity = 'card-bg card-bg-5';
          break;
        case "Rare":
          res.data.attributes.rarity = 'card-bg card-bg-4';
          break;
        case "Epic":
          res.data.attributes.rarity = 'card-bg card-bg-3';
          break;
        case "Diamond":
          res.data.attributes.rarity = 'card-bg card-bg-2';
          break;
        case "Platinum":
          res.data.attributes.rarity = 'card-bg card-bg-1';
          break;
      }
      
      if(res.data.attributes.edition_total === 0){
        res.data.attributes.edition_total = "Unlimited"
      }
      this.storeCards.push(res.data);
    },
    setBoostersOwned : function(_total){
      console.log('Updating Boosters owned...');
      //console.log(_total);
      this.boosters_owned = _total.toString();
    },
    setCzxpBalance :  function(bal){
      //console.log(bal.toString());
      this.czxp_balance = bal.toString();
    },
    sortByName : function(param) {
      this.storeCards.sort(dynamicSort(param))
    },
    sortByAttr : function(param) {
      this.storeCards.sort(sortAttributes(param))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>