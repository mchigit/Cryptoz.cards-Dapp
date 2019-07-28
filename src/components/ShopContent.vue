<template>
  <div>
    
    <!-- Buy booster cards Modal -->
<div class="modal fade" id="buyBoostersPanel" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Booster cards will never be sold in the shop</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        Enter the number of booster credits you would like to purchase:
        <input id="toWallet" class="form-control" type="text" v-on:input="totalCreditsToBuy = $event.target.value" required />
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-danger" :disabled="confirmBoosterBuyBtnDisabled == 1" v-on:click="buyBoosters">Buy Credits</button>
      </div>
    </div>
  </div>
</div>
    
    
    <!--main role="main" class="container"-->
      <div class="jumbotron">
        
          <h1>Shop</h1>
          <p>The Shop is a place to mint limited edition Cryptoz Cards. Some cards are free, some have a cost. You may also buy and open a booster card, which will randomly mint an unlimited edition card</p>
          <p>
            To Claim a FREE card Or buy a Limited edition card, you will need the required minimun balance of CZXP tokens
          </p>
          <p>Total supply <img class="czxp-logo" src="static/czxp.png" /> <strong>{{total_czxp_supply}} CZXP tokens</strong></p>
            <p>There are a total of <strong>{{total_supply}} Cryptoz Types</strong> in the Universe</p>
            
          <div class="row">
            <div class="col">
              <button class="btn btn-danger" v-bind:disabled="buyBoostBtnOn == 0" data-toggle="modal" data-target="#buyBoostersPanel">Buy Booster Credits @ 0.002E
              </button>
            </div>
            <div class="col"><strong>Your Booster credits :</strong> {{boosters_owned}}
            </div>
            <div class="col"><strong>Your CZXP Balance :</strong> {{czxp_balance}}
            </div>
          </div>
          <br>
          <div class="row">
              <div class="col">
                <div class="dropdown">
                  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Sort By
                  </button>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item" href="#" v-on:click="sortByName('name')">Name</a>
                    <a class="dropdown-item" href="#" v-on:click="sortByAttr('rarity')">Rarity</a>
                    <a class="dropdown-item" href="#" v-on:click="sortByAttr('cost')">Cost</a>
                    <a class="dropdown-item" href="#" v-on:click="sortByAttr('card_set')">Card Set</a>
                    <a class="dropdown-item" href="#" v-on:click="sortByAttr('in_store')">In Store</a>
                    <a class="dropdown-item" href="#" v-on:click="sortByAttr('edition_total')">Edition Total</a>
                    <a class="dropdown-item" href="#" v-on:click="sortByAttr('card_level')">Level</a>
                    <a class="dropdown-item" href="#" v-on:click="sortByAttr('unlock_czxp')">Unlock CZXP</a>
                    <a class="dropdown-item" href="#" v-on:click="sortByAttr('buy_czxp')">Buy CZXP</a>
                    <a class="dropdown-item" href="#" v-on:click="sortByAttr('transfer_czxp')">Transfer CZXP</a>
                    <a class="dropdown-item" href="#" v-on:click="sortByAttr('sacrifice_czxp')">Sacrifice CZXP</a>
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" v-bind:checked="showUnlimited" v-on:click="doHideUnlimited">
                  <label class="form-check-label" for="defaultCheck1">
                    Show Unlimited
                  </label>
                </div>
              </div>
            </div>
          <br>
          <div class="row">
              <OwnedCardContent v-on:child-sent="handleChild"
                v-for="card in storeCards" :key="card.attributes.type_id"
                :type_id="card.attributes.type_id"
                :name="card.name"
                :cost="card.attributes.cost"
                :cset="card.attributes.card_set"
                :edition_total="card.attributes.edition_total"
                :in_store="card.attributes.in_store"
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
    <!--/main-->
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
      showUnlimited : 1,
      total_supply : 'Log in Metamask',
      boosters_owned : 'Log in Metamask',
      czxp_balance : 'Log in Metamask',
      transaction_number : '',
      storeCards: [],
      buyBoostBtnOn: 0,
      confirmBoosterBuyBtnDisabled: 0,
      totalCreditsToBuy : '',
      total_czxp_supply : 'Log in for total ',
      allCards : [] //We never mangle this
    }
  },
  mounted () {
    console.log('The shop is mounted, call for the cards, if we have a contract..');
    
    if(typeof(Cryptoz) !== "undefined"){
      this.setSubscriptions();
    }else{
      console.log('no Cryptoz in shop !!!!!!!!!!');
    }

      this.$root.$on('userLoggedIn', () => {
        //console.log('hey userLoggedIn event in Shop! it is' + window.account)
        //console.log(window.account)
        //console.log('userLoggedIn...shopContent, set logged in state');
        this.setLoggedInState();
        //this.$root.$off('userLoggedIn');
      })

    //if the user has logged, start it up
    if(typeof(window.account) !== "undefined"){
      //console.log('User is logged in already... start up SHOP content for:' . window.account);
      this.setLoggedInState();
    }
      
  },
  methods : {
    handleChild : function(){
      console.log('Handle child sent...in Shop')
      
    },
    setCZXPSupply : function() {
      console.log('Buy setCZXPSupply called..');
      var self = this;
      CzxpToken.deployed().then(function(instance) {
        return instance.totalSupply.call({from: account});
      }).then(this.handleSetCZXPSupply) //update boosters owned and total types
    },
    doHideUnlimited : function(){
      console.log('Hide/show unlimited' + this.showUnlimited)
      if(this.showUnlimited){
        this.showUnlimited = 0  //hide
        this.storeCards = this.allCards.filter(card => card.attributes.in_store == 'Store')
      }else{
        this.showUnlimited = 1  //show
        this.storeCards = this.allCards
      }
    },
    buyBoosters : function() {
      console.log('Buy boosters called..');
      var self = this;
      Cryptoz.deployed().then(function(instance) {
        var totalBoostersCost = 2000000000000000 * parseInt(self.totalCreditsToBuy);
        return instance.buyBoosterCard(parseInt(self.totalCreditsToBuy), {from: account, value:totalBoostersCost});
      //}).then(this.handleBuyBooster)
      }).then(this.handleBuyBooster) //update boosters owned and total types
      
    },
    handleSetCZXPSupply :  function(_totalSupply) {
      console.log('Handling set czxp supply');
      this.total_czxp_supply = parseInt(_totalSupply).toLocaleString();
    },
    handleBuyBooster : function(result) {
      console.log('Handling buy booster');
      //this.setLoggedInState();
      //this.$emit('child-sent')
      this.setLoggedInState();
      
    },
    setSubscriptions : function() {
      console.log("Subscriptions ready in shop.. get all the card types..");

      Cryptoz.deployed().then(function(instance) {
        return instance.getTotalTypes.call();
      }).then(this.setTotalSupply)
      
      CzxpToken.deployed().then(function(instance) {
        return instance.totalSupply.call();
      }).then(this.handleSetCZXPSupply) //update boosters owned and total types
      
    },
    setLoggedInState : function() {
      Cryptoz.deployed().then(function(instance) {
        return instance.boosterPacksOwned(account);
      }).then(this.setBoostersOwned)
      
      this.updateCZXPBalance();
      
      this.buyBoostBtnOn = 1;
      
    },
    updateCZXPBalance :  function() {
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
      //console.log(res.data);
      
      var newAttr = [];
      //format the attributes to match our JS objects
      res.data.attributes.forEach(function(element){
        newAttr[element.trait_type] = element.value;
      })
            
      //Overwrite our JSON reponse with vue friendly card binding data
      res.data.attributes = newAttr;
      
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
      this.allCards.push(res.data);
      this.storeCards.push(res.data);
    },
    setBoostersOwned : function(_total){
      console.log('Updating Boosters owned...');
      //console.log(_total);
      this.boosters_owned = parseInt(_total).toLocaleString();
    },
    setCzxpBalance :  function(bal){
      console.log(bal.toLocaleString());
      this.czxp_balance = parseInt(bal).toLocaleString();
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
  .jumbotron {
    margin: auto;
    width: 95%;
  }
  .czxp-logo {
    width : 3%;
  }
</style>