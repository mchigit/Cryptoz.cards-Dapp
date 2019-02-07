<template>
  <div>
        <main role="main" class="container">
        <div class="jumbotron">
          <h1>Your Cryptoz Wallet</h1>
          <p>This is where all your Cryptoz cards can be accessed. From here you can sort your cards, search your cards and sacrifice. Sacrificing is permanent. Not only in your wallet, but across the entire Cryptoz Universe. That unique item is gone forever.</p>
          
          <!-- Loads cards here -->
            <div class="row">
              <div class="col">
                <button class="btn btn-danger" v-if="boosters_owned > 0" v-on:click="openBooster">Open Booster Card
                </button>
                <button class="btn btn-danger" v-else v-on:click="openBooster" disabled>Open Booster Card
                </button>
              </div>
              <div class="col">
                <button class="btn btn-danger" v-bind:disabled="buyOpenBtnOn == 0" v-on:click="buyAndOpenBooster">Buy and Open Booster 0.01E
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
            </div>
            <br>
            <div class="row" v-if="ownsCards == 1">
              <OwnedCardContent v-on:card-updated="handleCardUpdated"
                v-for="card in allCards" :key="card.id"
                :id="card.id"
                :type_id="card.attributes.type_id"
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
    //first check if the dapp is authed and logged in
    console.log('cryptcontent mounted...')
    
      this.$root.$on('userLoggedIn', () => {
        console.log('hey userLoggedIn event in Crypt!')
        console.log(window.account)
        console.log('userLoggedIn...cryptContent..run subscriptions');
        this.$root.$off('userLoggedIn')
        //enable the button
        this.setSubscriptions();
      })

    //if the user has logged, start it up
    if(window.account !== undefined){
      this.setSubscriptions()
    }
      
  },
  data () {
    return {
      czxp_balance : 'Log in Metamask',
      ownsCards : 0,
      cards_owned : 'Log in Metamask',
      boosters_owned : 'Log in Metamask',
      el : 0,
      buyOpenBtnOn : 0,
      allCards: []
    }
  },
  methods : {
    handleCardUpdated : function() {
      console.log('CryptContent got child event..re-render the view');
      this.setSubscriptions();
    },
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
      
      this.buyOpenBtnOn = 1;
    },
    buyAndOpenBooster : function() {
      console.log('Buy and Open Booster card...');
      
      Cryptoz.deployed().then(function(instance) {
        return instance.buyBoosterCardAndOpen({from: account, value:2000000000000000});
      //}).then(this.handleBuyBooster)
      }).then(this.handleBuyBooster) //update boosters owned and total types
      
    },
    handleGetAllCards : function(res) {
      console.log('Handling tokensOfOwner...');
      //console.log(res);
      
      //reset the view to empty
      this.allCards = []
      
      if(res.length > 0){
        console.log('Got cards.. start render');
        var self= this;
        //first we update the view
        this.ownsCards = 1;
        
        
        //Place to track our token array data
        var tokenIdList = [];

        //Define a function to do all our handling and chain the data before passing back to our view
        var getCard = function(tokenId){

          Cryptoz.deployed().then(function(instance) {
            return instance.getCardByTokenId.call(tokenId)
          }).then(function(elementReturned) {
            console.log('A card !' + tokenId);
            console.log(elementReturned);
            tokenIdList[tokenId] = elementReturned
            return axios.get('https://cryptoz.cards/services/getCardData.php?card_id=' + elementReturned[0].c[0])
          }).then(function(res){
            //console.log('token id:' + tokenId);
            //console.log('edition:' + tokenIdList[tokenId][1].c[0])
            console.log(res)
            
            //card token id
            res.data.id = tokenId;
            
            var newAttr = [];
            //format the attributes to match our JS objects
            res.data.attributes.forEach(function(element){
              newAttr[element.trait_type] = element.value;
            })
            
            //Overwrite our JSON reponse with vue friendly card binding data
            res.data.attributes = newAttr;
            
            //Edition total
            // #4  , #4 of 300
            if(res.data.attributes.edition_total == 0) //unlimited
            {
              res.data.attributes.edition_total = '#'+tokenIdList[tokenId][1].c[0];
            }else{
              res.data.attributes.edition_total = '#'+tokenIdList[tokenId][1].c[0] +' of '+res.data.attributes.edition_total;
            }
            
            //pass the card data array to our view update handler
            self.handleGotCardData(res);
          })
        }
        
        //Iterate through all our cards
        res.forEach(function(element){
          //tokenIdList.push(element.c[0]);
          getCard(element.c[0])
        })
        
        
      }else{
        console.log('no cards returned from handleGetAllCards()');
      }
    },
    getCurrentValue : function() {
      return this.el;
    },
    handleGotCardData : function(res) {
      //console.log(res.data);
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
      
      this.allCards.push(res.data);
    },
    handleBuyBooster : function(result) {
      console.log('Handling buy booster...');
      console.log(result)
      this.setSubscriptions();
    },
    openBooster : function () {
      Cryptoz.deployed().then(function(instance) {
        return instance.openBoosterCard(0, {from: account});
      }).then(this.setSubscriptions)
    },
    setCzxpBalance :  function(bal){
      //console.log(bal.toString());
      this.czxp_balance = bal.toLocaleString();
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
    sortByName : function(param) {
      this.allCards.sort(dynamicSort(param))
    },
    sortByAttr : function(param) {
      this.allCards.sort(sortAttributes(param))
    }
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