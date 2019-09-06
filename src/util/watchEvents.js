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
  
  
  
  CzxpToken.deployed().then(function(instance) {
    var cryptozEvents = instance.allEvents({fromBlock: 'latest'});
    
    cryptozEvents.watch(function(error, event){
      console.log('From WatchEvents.js...');
      if (!error)
        console.log(event);
      else
        console.log(error);
      });
  
    })

/*
            store.dispatch('pollWeb3', {
              coinbase: store.state.web3.coinbase,
              balance: polledBalance
            })
*/
}

export default watchEvents