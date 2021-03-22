<template>
  <div class="jumbotron">
    <universe-balances></universe-balances>
    <div class="description">
      <h1>NFT Wallet</h1>
      <p>
        This is where you can see other person's NTF Cryptoz tokens. You can
        sort, and view them in a table. But you will not be able to perform any
        actions on the NTFs.
      </p>
    </div>

    <cards-container v-bind:addressToLoad="addressToLoad"></cards-container>
  </div>
</template>

<script>
import CardsContainer from "@/components/CardsContainer.vue";
import UniverseBalances from "./UniverseBalances.vue";

export default {
  name: "OthersCryptContent",
  components: {
    CardsContainer,
    UniverseBalances,
  },
  data() {
    return {
      addressToLoad: null,
    };
  },
  created() {
    this.addressToLoad = this.$route.params.address;
  },
};
</script>

<style>
.jumbotron {
  margin: auto;
  width: 95%;
}

.description {
    margin-bottom: 16px;
}
</style>
