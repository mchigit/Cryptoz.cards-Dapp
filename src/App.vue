<template>
  <div id="app">
    <AppHeader v-on:doLogin="onDoLogin" v-bind:network_state="network_state" v-bind:wallet="wallet" />
    <transition name="component-fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <AppFooter v-bind:network_name="network_name" v-bind:network_state="network_state" />
  </div>
</template>

<script>
import BodyContent from './components/BodyContent'
import AppHeader from './components/layout/AppHeader'
import AppFooter from './components/layout/AppFooter'

window.dynamicSort = function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

window.sortAttributes = function sortAttributes(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a.attributes[property] < b.attributes[property]) ? -1 : (a.attributes[property] > b.attributes[property]) ? 1 : 0;
        return result * sortOrder;
    }
}




// Import our contract artifacts and turn them into usable abstractions.

import axios from 'axios';
var contract = require("truffle-contract");
import cryptoz_artifacts from './contracts/Cryptoz.json';
import cryptoz_token_artifacts from './contracts/CzxpToken.json';

export default {
  name: 'App',
  components: {
    BodyContent,
    AppHeader,
    AppFooter
  },
  mounted() {
    //this.init()
  },
  data() {
    return {
      network_state : 1, // 0 - no mm, 1 = mm not logged in, 2= mm logged in
      wallet : '',
      wallet_balance : 0,
      network_name : 'Detecting Ethereum network..Loading',
      eth_network_name : ''
    }
  },
  methods : {
    init :  function() {
      console.log('Starting up the app..');
      
      if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        web3.eth.net.getNetworkType()
          .then(this.networkDetected);// update
        this.setSubscriptions(); //Setup all the ethereum listeners
      }else{
        this.network_state = 0; //no mm detected
        console.log('no network');
      }
      
      // Cryptoz is our usable abstraction, which we'll use through the code below
      window.Cryptoz   = contract(cryptoz_artifacts);
      window.CzxpToken = contract(cryptoz_token_artifacts);
      Cryptoz.setProvider(web3.currentProvider);
      CzxpToken.setProvider(web3.currentProvider);
      console.log('Cryptoz and czxp token contracts are defined...');
      
      //Set some Log watches
      console.log('Setting Log event watches..');
      
      
      var cardOpenedEvent;
      var cardPurchasedEvent;
      var cardCreatedEvent;
      var cardTransferEvent;
      var boostCardPurchasedEvent;
      var sacrificeCardEvent;
      var czxpGainedEvent;
      
      Cryptoz.deployed().then(function(instance) {
        
        cardOpenedEvent = instance.LogPackOpened();
        cardPurchasedEvent = instance.LogCardPurchased();
        cardCreatedEvent = instance.LogCardCreated();
        cardTransferEvent = instance.TokenTransfer();
        czxpGainedEvent = instance.CZXPGained();
        sacrificeCardEvent = instance.SacrificeCardEvent();
        
        cardOpenedEvent.watch(function(error, result){
          if(!error){
            console.log("cardOpenedEvent result:");
            console.log(result);

          }else{
            console.log("cardOpenedEvent error:" . error);
          }
        });
      
        cardPurchasedEvent.watch(function(error, result){
          if(!error){
            console.log("cardPurchasedEvent result:");
            console.log(result);

          }else{
            console.log("cardPurchasedEvent error:" . error);
          }
        });
        
        cardCreatedEvent.watch(function(error, result){
          if(!error){
            console.log("cardCreatedEvent result:");
            //console.log(result);
            
            //Lets update our token tracking table
            if(result.event == "LogCardCreated" && typeof(window.account) !== "undefined")
            {
              //console.log(result.args.cardTokenId.c[0]);
              //console.log(result.args.cardTypeId.c[0]);
              //console.log(result.args.editionNumber.c[0]);
              console.log('Updating tokens table...');
              //Send to the service
              var dataString = 'token_id=' + result.args.cardTokenId.c[0] + '&edition_number=' + result.args.editionNumber.c[0] + '&transfer_count=1&card_type_id=' + result.args.cardTypeId.c[0] + '&owner=' + account;
              var res = axios.get('https://cryptoz.cards/services/setTokenData.php?' + dataString);
              //console.log('axios result:' + dataString)
              //console.log(res);
            }
          }else{
            console.log("cardCreatedEvent error:" . error);
          }
        });
        
        cardTransferEvent.watch(function(error, result){
          if(!error){
            console.log("cardTransferEvent result:");
            console.log(result);
            
          }else{
            console.log("cardTransferEvent error:" . error);
          }
        });
    
        sacrificeCardEvent.watch(function(error, result){
          if(!error){
            console.log("sacrificeCardEvent result:");
            console.log(result);
            
          }else{
            console.log("sacrificeCardEvent error:" . error);
          }
        });
        
      })
      
    },
    onDoLogin : function () {
      // Modern dapp browsers...
      console.log("Get ready to ask permission..");
/**
      if (window.ethereum) {
        //async () => {
          try {
              console.log('Ask for permission from metamask');
              // Request account access if needed
              //let result = await ethereum.enable();
              ethereum.enable();
          } catch (error) {
              // User denied account access...
              console.log("User denied our app, that is sad");
              console.log(error);
          }
          
          //tell children components we are ready
          
        //}
      }
      // Legacy dapp browsers...
      else if (window.web3) {
          console.log('in the legacy code of onDoLogin()');
          window.web3 = new Web3(web3.currentProvider);
          // Acccounts always exposed
      }
      // Non-dapp browsers...
      else {
          console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
**/
    },
    getWallet : function() {
      console.log('authorized.. now get wallet' + window.account);
      console.log(window.account);
      web3.eth.getBalance(window.account).then(this.updateBalance);
    },
    updateBalance : function(val) {
      console.log('ETH balance:'+val);
      this.wallet_balance = val.toLocaleString();
    },
    networkDetected :  function(val) {
      this.network_state = 1;
      this.eth_network_name = val;
      this.network_name = 'You are connected to Ethereum ' + val;
    },
    setName : function(block) {
      //console.log('setName called...' + block.number);
      this.network_name = 'You are connected to Ethereum ' + this.eth_network_name +' Block: '+ block.number.toString();
    },
    handleUserChange : function(data) {
      console.log('handleUserChange:' + data.networkVersion);
      //console.log(data);
      
      //If user account has changed.. then update
      if(typeof(data.selectedAddress) !== "undefined"){
        if(data.selectedAddress !== window.account){
          console.log(data.selectedAddress +' not the same as '+window.account)
          this.network_state = 2; //we are logged in
          this.wallet = data.selectedAddress.substr(0,5) + '...' + data.selectedAddress.substr(35,5);
          window.account = data.selectedAddress; // global for components to grab at
          //web3.eth.defaultAccount = web3.eth.accounts[0];
          this.getWallet();
          this.$root.$emit('userLoggedIn');
        }else{
          console.log(data.selectedAddress +' IS the same as '+window.account)
        }
      }
      
      //if network has changed, handle it
      if(data.networkVersion !== window.networkVersion){
        console.log(data.networkVersion +' not the same as '+window.networkVersion)
        //make sure we are on a network that has our contacts
        //1 = main,
        
        window.networkVersion = data.networkVersion
      }
      
    },
    setSubscriptions : function() {
      console.log('Setting all subscriptions...');
      
      //This fires every time MetaMask is opened
      web3.currentProvider.publicConfigStore.on('update', this.handleUserChange);
      
      var subscription = web3.eth.subscribe('newBlockHeaders', function(error, result){
        if (!error) {
          //console.log("New block headers incoming..");
          //console.log(result);
          return;
        }
        //console.error(error);
      })
      //.on("data", function(blockHeader) {
      .on("data", this.setName) //pass the block number into our function
      .on("error", console.error);
      
    },
    handleTransaction : function(val) {
      console.log('Parent caught the transaction..' + val);
    }
  } //methods
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
