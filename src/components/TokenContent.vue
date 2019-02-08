<template>
  <div>
    <main role="main" class="container">
      <div class="jumbotron">
      <div class="row">
        <div class="col-4 text-right">
                <OwnedCardContent
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
      </div>
    </div>
    </main>
  </div>
</template>

<script>
  import axios from 'axios'
  import OwnedCardContent from '@/components/OwnedCardContent.vue'
  
  export default {
    name: 'TokenContent',
    components : {
      OwnedCardContent
    },
    data () {
      return {
        owner: 'Loading..',
        token_id : '',
        card : '',
        etherscan_token_id : 'https://etherscan.com/contract/token/'
      }
    },
    mounted () {
      this.startSubscriptions();
    },
    methods: {
      startSubscriptions : function() {
        console.log(this.$route.query.token_id);
        this.token_id = this.$route.query.token_id;
        
        var self = this;
        var contract;
        
        Cryptoz.deployed().then(function(instance) {
          contract = instance;
          return instance.ownerOf(1, {from: account, gas:342000});
        }).then(function(res){
          console.log(res);
          return contract.getCardByTokenId(1, {from: account, gas:342000});
        }).then(function(res){
          console.log(res);
        })
        
        this.getCardData();
      },
      getCardData : function() {
        
        axios.get('https://cryptoz.cards/services/getCardData.php?card_id=' + this.token_id)
                .then(this.handleGotCardData)
        
      },
      handleGotCardData : function(res) {
          
          console.log(res.data);
          
          var newAttr = [];
          //format the attributes to match our JS objects
          res.data.attributes.forEach(function(element){
            newAttr[element.trait_type] = element.value;
          })
                
          //Overwrite our JSON reponse with vue friendly card binding data
          res.data.attributes = newAttr;
          
          //Append the bg
          switch(res.data.attributes.rarity){
            case "Common":
              res.data.attributes.rarity = 'card-bg card-bg-6';
              break;
            case "Uncommon":
              res.data.attributes.rarity = 'card-bg card-bg-5';
              break;
            case "Rare":
              res.data.attributes.rarity = 'card-bg card-bg-4';
              break;
            case "Epic":
              res.data.attributes.rarity = 'card-bg card-bg-3';
              break;
            case "Diamond":
              res.data.attributes.rarity = 'card-bg card-bg-2';
              break;
            case "Platinum":
              res.data.attributes.rarity = 'card-bg card-bg-1';
              break;
          }
          
          if(res.data.attributes.edition_total === 0){
            res.data.attributes.edition_total = "Unlimited"
          }
          
          this.card = res.data;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>