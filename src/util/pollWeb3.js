import Web3 from 'web3'
import {store} from '../store/'

let pollWeb3 = function (state) {
  let web3 = window.web3
  web3 = new Web3(web3.currentProvider)

  setInterval(() => {
    if (web3 && store.state.web3.web3Instance) {
      if (web3.eth.coinbase !== store.state.web3.coinbase) {
        let newCoinbase = web3.eth.coinbase
        try {
        web3.eth.getBalance(web3.eth.coinbase, function (err, newBalance) {
          if (err) {
            console.log(err)
          } else {
            store.dispatch('pollWeb3Action', {
              coinbase: newCoinbase,
              balance: newBalance
            })
          }
        })
        }catch(error){
          console.log('poll failed:', error)
          //dispatch user logged out
          store.dispatch('userLoggedOut')
        }
      } else {
        web3.eth.getBalance(store.state.web3.coinbase, (err, polledBalance) => {
          if (err) {
            console.log(err)
          } else if (polledBalance !== store.state.web3.balance) {
            store.dispatch('pollWeb3Action', {
              coinbase: store.state.web3.coinbase,
              balance: polledBalance
            })
          }
        })
      }
    }
  }, 2000)
}

export default pollWeb3