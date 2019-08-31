<template>
  
  <b-row>
    <b-col>
      <strong>Your Boosters :</strong> {{boosters_owned}}
    </b-col>
    <b-col>
      <strong>Your Cryptoz:</strong> {{cards_owned}}
    </b-col>
    <b-col>
      <strong>Your CZXP Balance :</strong> {{czxp_balance}}
    </b-col>
  </b-row>
  
</template>
<script>

  export default {
    name: 'OwnerBalance',
    computed: {
      boosters_owned(){
        return this.$store.state.boostersOwned;
      },
      cards_owned(){
        return this.$store.state.cardsOwned;
      },
      czxp_balance(){
        return this.$store.state.czxpBalance;
      },
    },
    data () {
      return {
        
      }
    }
  }
  
</script>
<style scoped>


</style>