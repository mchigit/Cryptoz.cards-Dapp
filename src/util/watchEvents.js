import {store} from '../store/'

let watchEvents = function (state) {
  
  let web3 = window.web3
  web3 = new Web3(web3.currentProvider)
  
/**
  // can be 'latest' or 'pending'
  var filter = web3.eth.filter(filterString);
  // OR object are log filter options
  var filter = web3.eth.filter(options);
  // watch for changes
  filter.watch(function(error, result){
   if (!error)
     console.log(result);
  });
**/
  
  
  //This is all about CZXP tokens.. deal with events to this
  CzxpToken.deployed().then(function(instance) {
    var czxpEvents = instance.allEvents({fromBlock: 'latest'});
    
    czxpEvents.watch(function(error, event){
      console.log('From WatchEvents.js...');
      if (!error){
        //console.log(event);
        //IF event affects our wallet, dispatch
        if(event.args.to == store.state.web3.coinbase){
          store.dispatch('updateOwnerBalances');
        }
        //Otherwise a czxp event ALWAYS updates the universe balance
          store.dispatch('updateUniverseBalances');
      }else{
        console.log("ERROR in watchEvents.js czxpEvents : ", error);
      }
    });
  
  })
  
  //This is all about Cryptoz tokens.. deal with events to this
  Cryptoz.deployed().then(function(instance) {
    var cryptozEvents = instance.allEvents({fromBlock: 'latest'});
    
    cryptozEvents.watch(function(error, event){
      console.log('From WatchEvents.js...');
      if (!error){
        //console.log(event);
        //IF event affects our wallet, dispatch
        if(event.args.to == store.state.web3.coinbase){
          store.dispatch('updateOwnerBalances');
        }
        //Otherwise a czxp event ALWAYS updates the universe balance
          store.dispatch('updateUniverseBalances');
      }else{
        console.log("ERROR in watchEvents.js : ", error);
      }
    });
  
  })
}

export default watchEvents