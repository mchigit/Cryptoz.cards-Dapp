<template>
  <div class="row-col">
    <p>
      <strong
        >{{ totalCzxpSupply }} ZOOM {{ " "
        }}<img
          class="czxp-logo"
          src="https://zoombies.world/images/zoombies_coin.svg"
        />tokens
      </strong>
      {{ " " }}in ZWorld
    </p>
    <p>
      <strong>{{ totalCryptozTypes }} Mintable types</strong> in shop and
      boosters
    </p>
    <p>
      <strong>{{ totalCryptozSupply }} NFTs </strong> in ZWorld
    </p>
  </div>
</template>
<script>
import { UniverseBalances } from "vuex";

export default {
  name: "UniverseBalances",
  computed: {
    totalCzxpSupply() {
      return this.$store.state.totalCzxpSupply.toLocaleString();
    },
    totalCryptozSupply() {
      return this.$store.state.totalCryptozSupply.toLocaleString();
    },
    totalCryptozTypes() {
      return this.$store.state.totalCryptozTypes.toLocaleString();
    },
    coinbase() {
      return this.$store.state.web3.coinbase;
    },
  },
};
</script>
<style scoped>
p {
  padding-left: 10px;
  margin-bottom: 0;
}

.czxp-logo {
  width: 20px;
  margin-right: 2px;
}

.row-col {
  display: flex;
  flex-direction: column;

  margin: 20px 0;
}

@media screen and (min-width: 600px) {
  .row-col {
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
