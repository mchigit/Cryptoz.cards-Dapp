import Web3 from 'web3'

/*
* 1. Check for injected web3 (mist/metamask)
* 2. If metamask/mist create a new web3 instance and pass on result
* 3. Get networkId - Now we can check the user is connected to the right network to use our dApp
* 4. Get user account from metamask
* 5. Get user balance
*/

let getWeb3 = new Promise(function (resolve, reject) {
  // Check for injected web3 (mist/metamask)
  var web3js = window.web3
  //console.log('Inside getWeb3 in the js file....', web3js);
  if (typeof web3js !== 'undefined') {
      console.log('Inside getWeb3 in the js file..2..');
    var web3 = new Web3(web3js.currentProvider)
    //if(!web3.eth.coinbase){
      //reject(new Error('No permission yet'));
    //}
    
    resolve({
      injectedWeb3: web3.isConnected(),
      web3 () {
        return web3
      }
    })
  } else {
     web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545')) //GANACHE FALLBACK
    reject(new Error('Unable to connect to Metamask'))
  }
})
  .then(result => {
    return new Promise(function (resolve, reject) {
      // Retrieve network ID
      result.web3().version.getNetwork((err, networkId) => {
        if (err) {
          // If we can't find a networkId keep result the same and reject the promise
          reject(new Error('Unable to retrieve network ID'))
        } else {
          // Assign the networkId property to our result and resolve promise
          networkId = (networkId < 6000) ? networkId : '0'; //assign zero if internal network
          result = Object.assign({}, result, {networkId})
          resolve(result)
        }
      })
    })
  })
  .then(result => {
    return new Promise(function (resolve, reject) {
      // Retrieve coinbase
      result.web3().eth.getCoinbase((err, coinbase) => {
        if (err) {
          reject(new Error('Unable to retrieve coinbase'))
        } else {
          console.log('coinbase from getWeb3:', coinbase)
          result = Object.assign({}, result, { coinbase })
          resolve(result)
        }
      })
    })
  })
  .then(result => {
    return new Promise(function (resolve, reject) {
      console.log('Inside getWeb3 in the js file..2.5..');
      // Retrieve balance for coinbase
      result.web3().eth.getBalance(result.coinbase, (err, balance) => {
        if (err) {
          reject(new Error('Unable to retrieve balance for address: ' + result.coinbase))
        } else {
          result = Object.assign({}, result, { balance })
          resolve(result)
        }
      })
    })
  })
  .then(result => {
    return new Promise(function (resolve, reject) {
        console.log('Inside getWeb3 in the js file..3..');
      CzxpToken.deployed().then(function(instance) {
        console.log('get czxp balance in js...');
        return instance.balanceOf(result.coinbase);
      }).then(res => {
        console.log(res);
        var czxpBalance = parseInt(res).toLocaleString()
        result = Object.assign({}, result, {czxpBalance})
        resolve(result)
      })
    })
  })
  .then(result => {
    return new Promise(function (resolve, reject) {
        console.log('Inside getWeb3 in the js file..4..');
    Cryptoz.deployed().then(function(instance) {
      console.log("get cryptoz cards tokens balance...");
      return instance.balanceOf(result.coinbase);
    }).then(res => {
      console.log(res);
      var cardsOwned = parseInt(res).toLocaleString()
      result = Object.assign({}, result, {cardsOwned})
      resolve(result)
      })
    })
  })
  .then(result => {
    return new Promise(function (resolve, reject) {
        console.log('Inside getWeb3 in the js file..5..');
    Cryptoz.deployed().then(function(instance) {
      console.log("get cryptoz cards tokens balance...");
      return instance.boosterPacksOwned(result.coinbase);
    }).then(res => {
      console.log(res);
      var boostersOwned = parseInt(res).toLocaleString()
      result = Object.assign({}, result, {boostersOwned})
      resolve(result)
      })
    })
  }).catch(error => {
    console.log('ERROR in getWeb3 function:', error)
  })

export default getWeb3