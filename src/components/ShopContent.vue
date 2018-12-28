<template>
  <div>
        
        <main role="main" class="container">
        <div class="jumbotron">
          <h1>Shop</h1>
          <p>The Shop is a place to mint limited edition Cryptoz Cards. Some cards are free, some have a cost. You may also buy a booster card, which will randomly mint an unlimited edition card</p>
          <p>Sort | Search | Claim Free Cards</p>
          <p>
            <button class="btn btn-danger" v-on:click="buyBooster">Buy Booster Card</button>
            <button class="btn btn-danger" v-on:click="buyOpenBooster">Buy And Open Booster Card</button>
          </p>
          <div class="row">
              <OwnedCardContent
                v-for="card in storeCards"
                :id="card.id"
                :name="card.name"
                :cost="card.cost"
                :cset="card.cset"
                :edition_total="card.edition_total"
                :level="card.card_level"
                :unlock_czxp="card.unlock_czxp"
                :buy_czxp="card.buy_czxp"
                :transfer_czxp="card.transfer_czxp"
                :sacrifice_czxp="card.sacrifice_czxp"
                :url="card.graphic"
                :card_class="card.bg"
              ></OwnedCardContent>
          </div>
          
        </div>
      </main>
  </div>
</template>

<script>
import OwnedCardContent from '@/components/OwnedCardContent.vue'


export default {
  name: 'ShopContent',
  components : {
    OwnedCardContent
  },
  data () {
    return {
      storeCards: [
        {id:0, name: 'Jim Zombie',graphic: 'jim.svg', cost: 300, cset: 'We like to party set', edition_total: ' of 100',unlock_czxp : '1,300,300',card_level: 80, buy_czxp: '1,800',transfer_czxp: '100', sacrifice_czxp: '2,300',bg: 'card-bg card-bg-6'}
      ]
    }
  },
  mounted () {
    console.log('The shop is mounted, call for the cards');
    
  },
  methods : {
    buyBooster : function() {
      console.log('Buy booster called..');
    },
    buyOpenBooster : function() {
      console.log('Buy and open booster called..');
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>