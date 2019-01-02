<template>
  <div>
        <main role="main" class="container">
        <div class="jumbotron">
          <h1>Your Cryptoz Wallet</h1>
          <p>This is where all your Cryptoz cards can be accessed. From here you can sort your cards, search your cards and sacrifice. Sacrificing is permanent. Not only in your wallet, but across the entire Cryptoz Universe. That unique item is gone forever.</p>
          
          <!-- Loads cards here -->
            <div class="row">
              <div class="col">
                <button class="btn btn-danger" v-on:click="openBooster">Open Booster Card
                </button>
              </div>
              <div class="col">
                <button class="btn btn-danger" v-on:click="buyAndOpenBooster">Buy and Open Booster 0.01E
                </button>
              </div>
                <div class="col"><strong>Your CZXP Balance :</strong> {{czxp_balance}}
                </div>
            </div>
            <br>
            <div class="row">
              <div class="col"><strong>Your Boosters :</strong> {{boosters_owned}}
              </div>
              <div class="col"><strong>Your Cryptoz:</strong> {{cards_owned}}
              </div>
              <div class="col text-right"  v-if="ownsCards == 1">
                Sort | Search | Transfer
              </div>
            </div>
            <br>
            <div class="row" v-if="ownsCards == 1">
              <OwnedCardContent
                v-for="card in allCards" :key="card.id"
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
                :card_class="card.bg"
              ></OwnedCardContent>
            </div>
            <div v-else><h2>You do not own any Cryptoz<br><router-link to="/shop">To get Free Cryptoz or Buy one, visit the Shop</router-link></h2></div>
        </div>
      </main>
  </div>
</template>

<script>
import axios from 'axios'
import OwnedCardContent from '@/components/OwnedCardContent.vue'

export default {
  name: 'CryptContent',
  components : {
    OwnedCardContent
  },
  mounted () {
    this.setSubscriptions();
  },
  data () {
    return {
      czxp_balance : 'Loading...',
      ownsCards : 0,
      cards_owned : 'Loading...',
      boosters_owned : 'Loading...',
      allCards: []
    }
  },
  methods : {
    setSubscriptions : function() {
      CzxpToken.deployed().then(function(instance) {
        return instance.balanceOf(account);
      }).then(this.setCzxpBalance)
      
      Cryptoz.deployed().then(function(instance) {
        console.log("get cryptoz cards tokens balance...");
        return instance.balanceOf(account);
      }).then(this.setCryptozBalance)
      
      Cryptoz.deployed().then(function(instance) {
        return instance.boosterPacksOwned(account);
      }).then(this.setBoostersOwned)
      
      Cryptoz.deployed().then(function(instance) {
        return instance.tokensOfOwner(account)
      }).then(this.handleGetAllCards)
    },
    buyAndOpenBooster : function() {
      console.log('Buy and Open Booster card...');
      
      Cryptoz.deployed().then(function(instance) {
        return instance.buyBoosterCardAndOpen({from: account, value:10000000000000000});
      //}).then(this.handleBuyBooster)
      }).then(this.handleBuyBooster) //update boosters owned and total types
      
    },
    handleGetAllCards : function(res) {
      console.log('Handling got all cryptoz...');
      //console.log(res);
      
      if(res.length > 0){
        console.log('Got cards.. start render');
        var self= this;
        //first we update the view
        this.ownsCards = 1;
        
        var tokenIdList = [];
        res.forEach(function(element){
          tokenIdList.push(element.c[0]);
        })
        
        Cryptoz.deployed().then(function(instance) {
          //now lets loop call all the Cards this user has tokens for
          for (var i = 0; i < tokenIdList.length; i++) {
            instance.getCardByTokenId.call(tokenIdList[i]).then(function (elementReturned) {
              console.log('A card !');
              console.log(elementReturned[0].c[0] + ' ' + elementReturned[2].c[0]);
              
              //make a call to get the json cardType objects, push on allCards[]
              
              axios.get('https://cryptoz.cards/services/getCardData.php?card_id=' + elementReturned[0].c[0])
              .then(function(res){
                //do the edition total
                // #4  , #4 of 300
                if(res.data.attributes.edition_total == 0) //unlimited
                {
                  res.data.attributes.edition_total = '#'+elementReturned[2].c[0];
                }else{
                  res.data.attributes.edition_total = '#'+elementReturned[2].c[0] +' of '+res.data.attributes.edition_total;
                }
                
                self.handleGotCardData(res);
              })
              .catch(error => {
                console.log(error);
              })

            })
          }// end for loop
        })
        
      }else{
        console.log('no cards returned from handleGetAllCards()');
      }
    },
    handleGotCardData : function(res) {
      console.log(res.data);
      //Append the bg and edition #
      
      this.allCards.push(res.data);
    },
    handleBuyBooster : function(result) {
      console.log('Handling buy booster');
      this.setSubscriptions();
    },
    openBooster : function () {
      Cryptoz.deployed().then(function(instance) {
        return instance.openBoosterCard(0, {from: account});
      }).then(this.setSubscriptions)
    },
    setCzxpBalance :  function(bal){
      //console.log(bal.toString());
      this.czxp_balance = bal.toString();
    },
    setCryptozBalance : function(bal) {
      //console.log(bal.toString());
      this.cards_owned = bal.toString();
    },
    setBoostersOwned : function(_total){
      console.log('Updating Boosters owned...');
      //console.log(_total);
      this.boosters_owned = _total.toString();
    },
  }
}

/*
  Ok we need to track the state of the Crypt
  LoggedIn 1 or 0
  ownsCards 1 or 0
  Sorted By
    Name
    Date Type loaded
    Limited Edition
*/

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>