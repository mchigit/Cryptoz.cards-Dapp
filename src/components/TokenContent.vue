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
        <div class="col-2 text-right font-weight-bold">
          Owner:<br>
          Cryptoz Token #:<br>
          Editon #:<br>
          Times Transferred:<br>
          Card Name:<br>
          Description:<br>
          Card Set:<br>
          Zombie Type:<br>
          Rarity:<br>
          Total Available:<br>
          Cost:<br>
          Buy CZXP:<br>
          Transfer CZXP:<br>
          Sacrifice CZXP:<br>
          Unlock CZXP:<br>
          Level:
        </div>
        <div class="col-4">
          <a v-bind:href="owner_url" target="_blank">{{owner}}</a><br>
          {{token_id}}<br>
          {{edition_number}}<br>
          {{times_transferred}}<br>
          {{card.name}}<br>
          {{card.description}}<br>
          {{card.attributes.card_set}}<br>
          {{card.attributes.zombie_type}}<br>
          {{rarity}}<br>
          {{card.attributes.edition_total}}<br>
          {{card.attributes.cost}}<br>
          {{card.attributes.buy_czxp}}<br>
          {{card.attributes.transfer_czxp}}<br>
          {{card.attributes.sacrifice_czxp}}<br>
          {{card.attributes.unlock_czxp}}<br>
          {{card.attributes.card_level}}
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
        card : {"name" : "Loading...","description":"Loading..."              ,"attributes":{
                  "rarity":"Loading...",
                  "edition_total":"Loading...",
                  "cost":"Loading...",
                  "card_set":"Loading...",
                  "zombie_type":"Loading...",
                  "buy_czxp":"Loading...",
                  "transfer_czxp":"Loading...",
                  "sacrifice_czxp":"Loading...",
                  "unlock_czxp":"Loading...",
                  "card_level":"Loading...",
              }
          
        },
        owner_url: '',
        rarity : '',
        times_transferred : 'Loading..',
        edition_number :"Loading...",
        etherscan_token_id : 'https://etherscan.com/contract/token/'
      }
    },
    mounted() {
      console.log('Are we getting vars from App.vue ?...' + this.$parent.account);
      this.token_id = this.$route.params.token_id;
      console.log('from string..' + this.$route.params.token_id);
      console.log();
      setTimeout(this.startSubscriptions, 2000)
    },
    methods: {
      startSubscriptions : function() {
        console.log('subscriptions in tokenContent...');
        //console.log(this.$route.query.token_id);
        //this.token_id = this.$route.query.token_id;
        
        var self = this;
        var contract;
        
        Cryptoz.deployed().then(function(instance) {
          contract = instance;
          return instance.ownerOf(self.token_id, {from: account});
        }).then(function(res){
          console.log('owner is:');
          console.log(res);
          self.owner = res;
          self.owner_url = 'https://etherscan.io/address/' + res;
          return contract.getCardByTokenId(self.token_id, {from: account});
        }).then(function(elementReturned){
          console.log('cardBytoken:'); // 3 parts - type_id, edition_number, transfer_count
          console.log(elementReturned);
          console.log(elementReturned[0].c[0]);
          
          self.edition_number = elementReturned[1].c[0];
          self.times_transferred = elementReturned[2].c[0];
          
          self.getCardData(elementReturned[0].c[0]);
        })
        
        
      },
      getCardData : function(card_id) {
        
        axios.get('https://cryptoz.cards/services/getCardData.php?card_id=' + card_id)
                .then(this.handleGotCardData)
        
      },
      handleGotCardData : function(res) {
          
          //console.log(res.data);
          
          var newAttr = [];
          //format the attributes to match our JS objects
          res.data.attributes.forEach(function(element){
            newAttr[element.trait_type] = element.value;
          })
          
          //Overwrite our JSON reponse with vue friendly card binding data
          res.data.attributes = newAttr;
          
          //Get the human label for rarity
          this.rarity = res.data.attributes.rarity;
          
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
            res.data.attributes.edition_total = "Unlimited";
            res.data.attributes.cost = "Booster Only";
          }
          
          this.card = res.data;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>