<template>
  <div>
    
  <!-- Open Booster Modal -->
  <b-modal
    id="open-booster-modal"
    title="Enter a CZXP wager amount to increase the odds of pulling a rare or epic card:"
    ok-variant="danger"
    ok-title="Open Booster"
    hide-footer
  >
      
        Minimum = 0 Or 2,000,000,000 , Maximum = 1,649,267,441,667,000
        <input id="wager" class="form-control" type="text" v-on:input="wagerAmount = $event.target.value" value="0" required />
    <b-row>
      <b-col>
        <b-button class="mt-3" variant="danger" block @click="openBooster">Open Booster</b-button>
      </b-col>
      <b-col>
        <b-button class="mt-3" block @click="$bvModal.hide('open-booster-modal')">Cancel</b-button>
      </b-col>
    </b-row>
  </b-modal>
    
    <div class="jumbotron">
      
      <UniverseBalances></UniverseBalances>
      
          <h1>Your Cryptoz Wallet</h1>
          <p>This is where all your Cryptoz cards can be accessed. From here you can sort your cards, search your cards and sacrifice. Sacrificing is permanent. Not only in your wallet, but across the entire Cryptoz Universe. That unique item is gone forever.</p>
          
          <!-- Loads cards here -->
            <div class="row">
              <div class="col">
                <b-button class="btn btn-danger" v-bind:disabled="boostersOwned < 1" v-b-modal.open-booster-modal>Open Booster Card
                </b-button>
                <transition name="fade">
                  <span v-if="showSpinner==1">
                    <img src="@/assets/spinner.gif" class="spinner" /> <strong>{{transactionStatus}}</strong>
                  </span>
                </transition>
              </div>
              <div class="col">
                <button class="btn btn-danger" v-bind:disabled="balance < 2000000000000000" v-on:click="buyAndOpenBooster">Buy and Open Booster 0.002E
                </button>
              </div>
            </div>
            <br>
            
            <OwnerBalances></OwnerBalances>
            
            <br>
            
            <div class="row">
              <div class="col text-left"  v-if="ownsCards == 1">
                <b-dropdown id="dropdown" text="Sort By">
                    <b-dropdown-item @click="sortByName('name')">Name</b-dropdown-item>
                    <b-dropdown-item @click="sortByAttr('rarity')">Rarity</b-dropdown-item>
                    <b-dropdown-item @click="sortByAttr('cost')">Cost</b-dropdown-item>
                    <b-dropdown-item @click="sortByAttr('card_set')">Card Set</b-dropdown-item>
                    <b-dropdown-item @click="sortByAttr('edition_total')">Edition Total</b-dropdown-item>
                    <b-dropdown-item @click="sortByAttr('card_level')">Level</b-dropdown-item>
                    <b-dropdown-item @click="sortByAttr('unlock_czxp')">Unlock CZXP</b-dropdown-item>
                    <b-dropdown-item @click="sortByAttr('buy_czxp')">Buy CZXP</b-dropdown-item>
                    <b-dropdown-item @click="sortByAttr('transfer_czxp')">Transfer CZXP</b-dropdown-item>
                    <b-dropdown-item @click="sortByAttr('sacrifice_czxp')">Sacrifice CZXP</b-dropdown-item>
                </b-dropdown>
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
  </div>
</template>

<script>
import axios from 'axios'
import OwnedCardContent from '@/components/OwnedCardContent.vue'
import UniverseBalances from '@/components/UniverseBalances.vue'
import OwnerBalances from '@/components/OwnerBalances.vue'

export default {
  name: 'CryptContent',
  components : {
    OwnedCardContent,
    UniverseBalances,
    OwnerBalances
  },
  computed: {
    web3 () {
      return this.$store.state.web3
    },
    wallet () {
      return parseFloat(web3.fromWei(this.$store.state.web3.balance), 'ether');
    },
    balance(){
      return this.$store.state.web3.balance;
    },
    coinbase() {
      return this.$store.state.web3.coinbase;
    },
    cryptContent() {
      return this.$store.state.cryptContent;
    },
    boostersOwned() {
      return this.$store.state.boostersOwned;
    },
    currentEvent() {
      return this.$store.state.lastChainEvent;
    }
  },
  watch: {
    coinbase(newValue, oldValue) {
      console.log(`Updating from ${oldValue} to ${newValue}`);

      // new wallet.. reset their boosters and czxp balance
      if (newValue !== oldValue) {
        this.setSubscriptions();
      }
    },
    cryptContent(newValue, oldValue) {
      console.log(`Updating CryptContent from ${oldValue} to ${newValue}`);
      
      // stale crypt contents, refresh now
      if (newValue !== oldValue) {
        this.setSubscriptions();
      }
    },
    currentEvent(newValue,oldValue) {
      console.log('CRYPT currentEvent:',newValue)
      if(newValue !== oldValue && typeof newValue !== "undefined"){
        console.log('CRYPT old:',oldValue ,' new:',newValue);
        this.showSpinner = 0;
        this.transactionStatus = 'Confirmed ! balance updated';
        if(this.subscriptionState == 0){
          this.setSubscriptions();
        }
      }
    }
  },
  mounted () {
    if(this.coinbase !== null){
      console.log('Crypt is mounted..')
      this.setSubscriptions();
    }
  },
  data () {
    return {
      subscriptionState:0, // 0=idle,1=active
      showSpinner:0,
      transactionStatus: 'Pending confirmation...',
      czxp_balance : 'Log in Metamask',
      ownsCards : 0,
      el : 0,
      confirmOpenBtnDisabled : 0,
      wagerAmount : 0,
      allCards: []
    }
  },
  methods : {
    handleCardUpdated : function() {
      console.log('CryptContent got child event..re-render the view');
      this.setSubscriptions();
    },
    setSubscriptions : function() {
      this.subscriptionState = 1;
      var self = this;
      
      Cryptoz.deployed().then(function(instance) {
        return instance.tokensOfOwner(self.coinbase)
      }).then(this.handleGetAllCards)
      
    },
    buyAndOpenBooster : function() {
      console.log('Buy and Open Booster card...');
      var self = this;
      Cryptoz.deployed().then(function(instance) {
        return instance.buyBoosterCardAndOpen({from: self.coinbase, value:2000000000000000});
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
            return instance.getOwnedCard.call(tokenId)
          }).then(function(elementReturned) {
            //console.log('A card !' + tokenId);
            //console.log(elementReturned);
            tokenIdList[tokenId] = elementReturned
            return axios.get('https://cryptoz.cards/services/getCardData.php?card_id=' + elementReturned[0].c[0])
          }).then(function(res){
            //console.log('token id:' + tokenId);
            //console.log('edition:' + tokenIdList[tokenId][1].c[0])
            //console.log(res)
            
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
          //console.log(element.c[0]);
          //tokenIdList.push(element.c[0]);
          getCard(element.c[0])
        })
        
        
      }else{
        console.log('no cards returned from handleGetAllCards()');
        this.ownsCards = 0; //set the message to buy or get Cryptoz
      }
      //we are done, clear the state
      this.subscriptionState = 0;
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
      //console.log(result);
      this.$bvModal.hide('open-booster-modal')
      
      //change from pending to ready
      this.transactionStatus = 'Broadcast to chain...';
    },
    openBooster : function () {
      
      console.log('Wagering..' + this.wagerAmount);
      
      //Change buy button to pending.. or show some pending state
      this.showSpinner = 1;
      this.transactionStatus = 'Pending confirmation...';
      
      var self = this;
      
      this.$bvModal.hide('open-booster-modal')
      
      Cryptoz.deployed().then(function(instance) {
        return instance.openBoosterCard(self.wagerAmount, {from: self.coinbase});
      }).then(this.handleBoosterOpened)
      .catch(err => {
        console.log(err);
        this.showSpinner = 0;
        if (err.code === 4001) {
          this.$bvToast.toast(
            'You have rejected the transaction.',
            {
              title: 'Transaction Rejected',
              autoHideDelay: 5000,
              solid: true,
              variant: 'warning'
            }
          )
        }
      })
    },
    handleBoosterOpened : function(error, result) {
      if(!error){
        if(result !== undefined){
          console.log('handleBoosterOpened:' ,result.tx);
          //change from pending to ready
          this.transactionStatus = 'Broadcast to chain...';
          resolve(result);
        }else{
          console.log('USER CANCELLED in handleBoosterOpened');
          return reject(error);
        }
      }else{
        console.log('Error in handleBoosterOpened:', error);
        return reject(error);
      }
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
  .jumbotron {
    margin: auto;
    width: 95%;
  }
  .spinner {
    width: 2em;
  }
</style>