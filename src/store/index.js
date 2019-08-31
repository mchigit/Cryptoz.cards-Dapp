import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getWeb3 from '../util/getWeb3'
import pollWeb3 from '../util/pollWeb3'


Vue.use(Vuex)
export const store = new Vuex.Store({
 strict: true,
 state,
 mutations: {
  registerWeb3Instance (state, payload) {
    console.log('registerWeb3instance Mutation being executed', payload)
    let result = payload
    let web3Copy = state.web3
    web3Copy.coinbase = result.coinbase
    web3Copy.networkId = result.networkId
    web3Copy.balance = result.balance
    web3Copy.isInjected = result.injectedWeb3
    web3Copy.web3Instance = result.web3
    state.web3 = web3Copy
    pollWeb3()
  },
  pollWeb3Instance (state, payload) {
    //console.log('pollWeb3Instance mutation being executed', payload)
    state.web3.coinbase = payload.coinbase
    state.web3.balance = payload.balance
  },
  updateCryptContent (state) {
    state.cryptContent += 1;
  },
  updateOwnerBalances (state) {
    state.ownerBalances += 1;
  },
  updateCZXPBalance (state, payload) {
    console.log("updateCZXPBalance state.." ,payload);
    state.czxpBalance = payload
  },
  updateCardsOwned (state, payload) {
    state.cardsOwned = payload
  },
  updateBoostersOwned (state, payload) {
    state.boostersOwned = payload
  }
 },
 actions: {
   registerWeb3 ({commit}) {
      console.log('registerWeb3 Action being executed')
      getWeb3.then(result => {
        console.log('committing result to registerWeb3Instance mutation')
        commit('registerWeb3Instance', result)
      }).catch(e => {
        console.log('error in action registerWeb3', e)
      })
    },
    pollWeb3 ({commit}, payload) {
      //console.log('pollWeb3 action being executed')
      commit('pollWeb3Instance', payload)
    },
    updateCrypt ({commit}) {
      commit('updateCryptContent')
    },
    updateOwnerBalances ({commit}) {
      commit('updateOwnerBalances')
    },
    updateCZXPBalance ({commit}, payload){
      commit('updateCZXPBalance', payload)
    },
    updateCardsOwned ({commit}, payload){
      commit('updateCardsOwned', payload)
    },
    updateBoostersOwned ({commit}, payload){
      commit('updateBoostersOwned', payload)
    },
 }
})
