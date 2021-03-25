import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import { showSuccessToast } from "../util/showToast";

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true,
  state,
  mutations: {
    updateWallet (state, payload) {
      state.web3 = {...state.web3, ...payload}
    },
    web3isConnected (state, payload) {
      state.web3 = {...state.web3, isConnected: payload}
    },
    chainChanged (state, payload) {
      state.web3 = {...state.web3, chainId: payload}
    },
    setLastEvent (state, payload) {
      state.lastChainEvent = payload
    },
    updateCZXPBalance (state, payload) {
      state.czxpBalance = payload
    },
    updateCardsOwned (state, payload) {
      state.cardsOwned = payload
    },
    updateBoostersOwned (state, payload) {
      state.boostersOwned = payload
    },
    updateTypesTotal(state, payload) {
      state.totalCryptozTypes = payload
    },
    updateCZXPTotal(state, payload) {
      state.totalCzxpSupply = payload
    },
    updateCryptozTotal(state, payload) {
      state.totalCryptozSupply = payload
    },
    setStoreCards(state, payload) {
      state.shop.cards = payload
    },
    updateMintedCountForCard(state, payload) {
      const { cardTypeId, editionNumber } = payload

      const cardIndex = state.shop.cards.findIndex(card => card.type_id === cardTypeId)
      state.shop.cards[cardIndex].edition_current = editionNumber
    }
  },
  actions: {
    updateWallet ({commit}) {
      window.web3.eth.getCoinbase((err, coinbase) => {
        if (err) {
          console.error('Error: ', err)
        }
        if (coinbase !== null) {
          window.web3.eth.getBalance(coinbase, (err, balance) => {
            commit('updateWallet', {coinbase, balance})
          })
        }
      })
    },
    disconnnectWallet({commit}) {
      commit('updateWallet', {coinbase: null, balance: null})
    },
    web3isConnected({commit}, payload) {
      commit('web3isConnected', payload)
      if (payload === false) {
        commit('updateCardsOwned', 0)
        commit('updateBoostersOwned', 0)
        commit('updateCZXPBalance', 0)
      }
    },
    chainChanged({commit}, payload) {
      commit('chainChanged', payload)
    },
    async updateOwnerBalances ({commit}) {
      const [cryptozInstance, czxpInstance] = await Promise.all([Cryptoz.deployed(), CzxpToken.deployed()])
      const coinbase = this.state.web3.coinbase
      const czxpBalancePromise = czxpInstance.balanceOf(coinbase);
      const cryptozBalancePromise = cryptozInstance.balanceOf(coinbase);
      const boosterPacksOwnedPromise = cryptozInstance.boosterPacksOwned(coinbase);

      const [czxpBalance, cryptozBalance, boosterPacksOwned] = await Promise.all([czxpBalancePromise, cryptozBalancePromise, boosterPacksOwnedPromise])
      commit('updateCZXPBalance', parseInt(czxpBalance).toLocaleString())
      commit('updateCardsOwned', parseInt(cryptozBalance.length).toLocaleString())
      commit('updateBoostersOwned', parseInt(boosterPacksOwned).toLocaleString())
    },
    async updateUniverseBalances({commit}, payload){
      const [cryptozInstance, czxpInstance] = await Promise.all([Cryptoz.deployed(), CzxpToken.deployed()])
      const totalCzxpPromise = czxpInstance.totalSupply();
      const totalTypesPromise = cryptozInstance.getTotalTypes();
      const totalCryptozPromise = cryptozInstance.totalSupply();

      const [totalCzxp, totalTypes, totalCryptoz] = await Promise.all([totalCzxpPromise, totalTypesPromise, totalCryptozPromise])
      commit('updateCZXPTotal', parseInt(totalCzxp).toLocaleString())
      commit('updateTypesTotal', parseInt(totalTypes).toLocaleString())
      commit('updateCryptozTotal', parseInt(totalCryptoz).toLocaleString())
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
    updateTypesTotal({commit}, payload){
      commit('updateTypesTotal', payload)
    },
    updateCZXPTotal({commit}, payload){
      commit('updateCZXPTotal', payload)
    },
    updateCryptozTotal({commit}, payload){
      commit('updateCryptozTotal', payload)
    },
    userLoggedOut({commit}){
      commit('userLoggedOut')
    },
    setStoreCards({commit}, payload) {
      commit('setStoreCards', payload)
    },
    updateMintedCountForCard({commit}, payload) {
      commit('updateMintedCountForCard', payload)
    },
    setLastEvent ({commit}, payload) {
      commit('setLastEvent', payload)
    },
  }
})
