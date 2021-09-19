<template>
  <div class="row-col">
    <p>
      <strong>
        <number
          ref="zoomBal"
          :from="fromZoomBalance"
          :to="toZoomBalance"
          :format="formatNumber"
          :duration="2"
        />
        ZOOM {{ " " }}
        <img
          class="czxp-logo"
          src="https://zoombies.world/images/zoombies_coin.svg"
        />
        tokens
      </strong>
      {{ " " }}in ZWorld
    </p>
    <p>
      <strong>
        <number
          ref="nftTypes"
          :from="fromNftTypes"
          :to="toNftTypes"
          :format="formatNumber"
          :duration="2"
        />
        Mintable types
      </strong>
      in shop and boosters
    </p>
    <p>
      <strong>
        <number
          ref="nftSupply"
          :from="fromNftSupply"
          :to="toNftSupply"
          :format="formatNumber"
          :duration="2"
        />
        NFTs
      </strong>
      in ZWorld
    </p>
  </div>
</template>
<script>
import { UniverseBalances } from "vuex";

export default {
  name: "UniverseBalances",
  data() {
    return {
      newZoomBalance: null,
      prevZoomBalance: null,
      newNftTypes: null,
      prevNftTypes: null,
      newNftSupply: null,
      prevNftSupply: null,
    }
  },
  methods: {
    formatNumber(number) {
      return parseInt(number.toFixed(0)).toLocaleString()
    },
    pulsateText(ref) {
      ref.$el.classList.value = ref.$el.classList.value + 'pulsate'
      ref.play()
      setTimeout(() => {
        ref.$el.classList.value = ''
      }, 500)
    }
  },
  computed: {
    zoomBalance() {
      return this.$store.state.totalCzxpSupply/1000000000000000000;
    },
    fromZoomBalance() {
      return this.prevZoomBalance || this.zoomBalance
    },
    toZoomBalance() {
      return this.newZoomBalance || this.zoomBalance
    },
    nftSupply() {
      return this.$store.state.totalCryptozSupply;
    },
    fromNftSupply() {
      return this.prevNftSupply || this.nftSupply
    },
    toNftSupply() {
      return this.newNftSupply || this.nftSupply
    },
    nftTypes() {
      return this.$store.state.totalCryptozTypes;
    },
    fromNftTypes() {
      return this.prevNftTypes || this.nftTypes
    },
    toNftTypes() {
      return this.newNftTypes || this.nftTypes
    },
    coinbase() {
      return this.$store.state.web3.coinbase;
    },
  },
  watch: {
    zoomBalance(newVal, oldVal) {
      this.newZoomBalance = newVal
      this.prevZoomBalance = oldVal
      console.log({newVal, oldVal})
      if (oldVal > 0) {
        this.pulsateText(this.$refs.zoomBal)
      }
    },
    nftSupply(newVal, oldVal) {
      this.newNftSupply = newVal
      this.prevNftSupply = oldVal
      if (oldVal > 0) {
        this.pulsateText(this.$refs.nftSupply)
      }
    },
    nftTypes(newVal, oldVal) {
      this.newNftTypes = newVal
      this.prevNftTypes = oldVal
      if (oldVal > 0) {
        this.pulsateText(this.$refs.nftTypes)
      }
    },
  }
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

.pulsate {
  display: inline-block;
  transform: scale(1);
  animation: pulsate 0.5s ease-out;
}

@keyframes pulsate {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
