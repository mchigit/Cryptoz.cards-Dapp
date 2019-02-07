<template>
  <div>
    <div class="row">
      <div class="col-4 text-right">
              <OwnedCardContent v-on:card-updated="handleCardUpdated"
                :key="card.id"
                :id="card.id"
                :type_id="card.attributes.type_id"
                :name="card.name"
                :cost="card.attributes.cost"
                :cset="card.attributes.card_set"
                :edition_total="card.attributes.edition_total"
                :level="card.attributes.card_level"
                :unlock_czxp="card.attributes.unlock_czxp"
                :buy_czxp="card.attributes.buy_czxp"
                :transfer_czxp="card.attributes.transfer_czxp"
                :sacrifice_czxp="card.attributes.sacrifice_czxp"
                :image="card.image"
                :card_class="card.attributes.rarity"
              ></OwnedCardContent>
      </div>
      <div class="col-4">
            <div class="card-details-data">
              <div class="card-txt-black"><span class="font-weight-bold">Owner:</span> <a v-bind:href="etherscan_token_id" target="_blank" style="color:blue">{{owner}}</a></div>
              <div class="card-txt-black"><span class="font-weight-bold">Cryptoz Token #:</span>{{token_id}}</div>
              <div class="card-txt-black"><span class="font-weight-bold">Rarity:</span>{{rarity}}</div>
              <div class="card-txt-black"><span class="font-weight-bold">Total Available:</span> {{edition_total}}</div>
              <div class="card-txt-black"><span class="font-weight-bold">Times Traded:</span> {{transfer_count}}</div>
              <div class="card-txt-black"><span class="font-weight-bold">Cost:</span> {{cost}} E</div>
              <br>
              <div class="card-txt-black"><span class="font-weight-bold">Buy CZXP:</span> {{buy_czxp}}</div>
              <div class="card-txt-black"><span class="font-weight-bold">Transfer CZXP:</span> {{transfer_czxp}}</div>
              <div class="card-txt-black"><span class="font-weight-bold">Sacrifice CZXP:</span> {{sacrifice_czxp}}</div>
              <div class="card-txt-black"><span class="font-weight-bold">Unlock CZXP:</span> {{unlock_czxp}}</div>
              <div class="card-txt-black"><span class="font-weight-bold">Level:</span> {{card_level}}</div>
              <br>
            </div>
      </div>
    </div>
  </div>
</template>

<script>
  //import axios from 'axios'
  import OwnedCardContent from '@/components/OwnedCardContent.vue'
  
  export default {
    name: 'TokenContent',
    components : {
      OwnedCardContent
    },
    data () {
      return {
        card : ''
      }
    },
    mounted () {
      
    },
    methods: {
      whatArg : function(){
        console.log(this.$route.query.token_id);
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>