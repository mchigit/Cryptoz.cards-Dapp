<template>
  <div>
        <main role="main" class="container">
        <div class="jumbotron">
          <h1>My Crypt</h1>
          <p>This is where all your Cryptoz cards can be accessed. From here you can sort your cards, search your cards and sacrifice. Sacrificing is permanent. Not only in your wallet, but across the entire Cryptoz Universe. That unique item is gone forever.</p>
          
          <!-- Loads cards here -->
          <div v-if="ownsCards == 0">
            <h2>You do not own any cards yet</h2>
            <router-link to="/help">How do I get Cryptoz cards ?</router-link>
          </div>
          <div v-else>
            <p>Sort | Search | Transfer</p>
            <OwnedCardContent
              v-for="card in allCards"
              v-bind:id="card.id"
            ></OwnedCardContent>
          </div>
        </div>
      </main>
  </div>
</template>

<script>
import OwnedCardContent from '@/components/OwnedCardContent.vue'

export default {
  name: 'CryptContent',
  components : {
    OwnedCardContent
  },
  data () {
    return {
      msg: 'Here we go, here we go',
      ownsCards : 1,
      allCards: [
        {id:0, card_name: 'test1'},
        {id:1},
        {id:2}
      ]
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