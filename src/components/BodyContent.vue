<template>
  <div class="black-bg">
    <main role="main" class="container">
      <b-card bg-variant="dark" text-variant="white" border-variant="info">
        <b-card-text>
          <br/>
          <br/>
          <h1>
            Zoombies is the play-to-earn NFT collectibles trade game built on scarcity, rarity
            and community
          </h1>
          <br/>
          <img
            class="img-responsive card-demo-group"
            src="@/assets/zoombies_card_types.png"
          />
          <h1 class="text-danger">OPEN BETA ON MOONBASE ALPHA TESTNET</h1>
          <!--p>Zoombies is deployed on
            <img src="https://zoombies.world/images/moonriver-logo-500.png" style="max-width:7em" />
          </p-->
          <p>
            <h2>ZOOM Token Liquidity Sale Event !</h2>
            <p>Holding a sufficient ZOOM token balance will unlock FREE and 1/3 reduced Shop NFT minting costs</p>
            <br/>
            <b-container fluid>
              <b-row>
                <b-col><strong>Max. 500 wallets</strong></b-col>
                <b-col><strong>Max Total sale: 5 Billion ZOOM</strong></b-col>
                <b-col><strong>1 ZOOM = 0.000001 MOVR</strong></b-col>
                <b-col><strong>Max purchase: 10 MOVR</strong></b-col>
              </b-row>
              <b-row>
                <b-col class="text-warning">{{zoomWalletsRemaining}} slots remaining</b-col>
                <b-col class="text-warning">{{zoomSold}} World sold</b-col>
                <b-col class="text-success">Your Purchases: {{myPurchaseTotal}}</b-col>
                <b-col></b-col>
              </b-row>
              <br/>
              <b-row align-h="center">
                <b-col class="text-right" style="padding-top:6px"><strong>Total to purchase:</strong> <span class="text-success">{{pendingPurchase}}</span></b-col>
                <b-col cols="2"><b-form-input v-model="totalCzxpToBuy" size="10" maxlength="8" placeholder="enter amount" @keyup="filterCzxpInput" class=""></b-form-input> ZOOM tokens</b-col>
                <b-col><input type="submit" class="btn btn-primary" @click="buyCzxp" :disabled="!buyCzxpBtnEnabled"></b-col>
              </b-row>
            </b-container>
            <hr />
          </p>
          <h2>Time to have some fun !</h2>
          <p>
            The goal is to collect the rare and unique undead NFT cards, earn or
            trade ERC-20 ZOOM tokens to unlock FREE shop minting and reduced shop pricing.</p>
          <p>Each minted NFT Zoombies card is a unique token on the Moonriver blockchain.
            Collectors can buy, sell, and exchange both their Zoombies NFT
            cards and ZOOM tokens through any standards compliant wallets,
            markets, game engines, exchanges, DeFi and other future inventions.
          </p>
          <p>The most profitable strategy is to <strong>grow your Affiliate network early</strong> and earn ZOOM tokens for Free :). Click the Affiliate link in the header to Share and earn</p>
          <div>
            <h2>Get Started</h2>
            <span
              >To interact with Zoombies you will need to
              <a
                href="https://docs.moonbeam.network/getting-started/moonbase/metamask/"
                target="_blank"
                >install Metamask configured for Moonbase alpha</a
              >
              and have a small amount of DEV in your account.</span
            >
          </div>
          <p>
            NFT token collecting and trading is an exciting and new opportunity
            for classic and modern collectors alike. What makes this platform
            unique compared to other online digital asset based games or systems
            are:
          </p>
          <ul>
            <li>
              Zoombies NFT Card functions and data are a set of Smart Contracts
              that run independantly of the creators. There is no OFF switch. The
              Zoombies NFT World will live forever on Moonriver.
            </li>
            <li>
              The developers can Not tamper or change the Card types once they are
              loaded. i.e: no re-minting scarce NFTs
            </li>
            <li>
              The NFTs are truly unique, owned and transferable between wallets
              manaully or automated through NFT auction marketplaces.
            </li>
          </ul>
          <p>
            <router-link to="/help"> Visit the Help section </router-link> of the
            website to read more
          </p>
        </b-card-text>
      </b-card>
    </main>

  </div>
</template>

<script>
import {
  BCard,
  BButton,
  BCardText,
  BContainer,
  BRow,
  BCol,
  BFormInput
} from "bootstrap-vue";
export default {
  name: "BodyContent",
  components: {
    BCard,
    BButton,
    BCardText,
    BContainer,
    BRow,
    BCol,
    BFormInput
  },
  data() {
    return {
      zoomSold: "Loading..",
      zoomWalletsRemaining: "Loading..",
      totalCzxpToBuy: "",
      movrCost: 0,
      myPurchaseTotal: 0,
    };
  },
  computed: {
    buyCzxpBtnEnabled() {
      if (
        this.totalCzxpToBuy !== "" &&
        this.totalCzxpToBuy >= 1 &&
        this.totalCzxpToBuy <= 10000000 &&
        this.myPurchaseTotal < 10000000
      ) {
        return true;
      } else {
        return false;
      }
    },
    coinbase() {
      return this.$store.state.web3.coinbase;
    },
    CzxpInstance() {
      return this.$store.state.contractInstance.czxp;
    },
    ZoombiesInstance() {
      return this.$store.state.contractInstance.cryptoz;
    },
    pendingPurchase() {
      return this.movrCost + " MOVR =";
    },
    buyEnabled() {
      if(this.myPurchaseTotal < 10000000){
        return true;
      }else{
        return false;
      }
    }
  },
  mounted() {
    this.$nextTick(function () {
      this.updateSale();
    });
  },
  methods: {
    buyCzxp: async function () {
      await this.CzxpInstance.methods.buy().send({
        from: this.coinbase,
        value: this.totalCzxpToBuy * 1000000000000,
      }).then((res) => {
         //console.log(res.status);
         if(res.status){
           this.updateSale();
         }
      }).catch((e) => {
        console.error(e);
      });
    },
    updateSale: async function () {
      this.zoomWalletsRemaining = 500 - await this.CzxpInstance.methods.totalContributors().call();
      this.zoomSold = parseInt(await this.CzxpInstance.methods.totalZoomPurchased().call()).toLocaleString();
      this.totalCzxpToBuy = "";
      this.movrCost = 0;
      this.myPurchaseTotal = parseInt(await this.CzxpInstance.methods.contributions(this.coinbase).call() /1000000000000).toLocaleString() ;
    },
    filterCzxpInput: function () {
      this.totalCzxpToBuy = this.totalCzxpToBuy.replace(/[^\d]/g, "");
      if( (parseInt(this.myPurchaseTotal)+this.totalCzxpToBuy) >= 10000000 ){
        this.totalCzxpToBuy = parseInt(10000000 - parseInt(this.myPurchaseTotal.replace(/,/g, '')));
      }
      this.movrCost = this.totalCzxpToBuy / 1000000;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.black-bg {
  background-color: #000000;
}

.feature-panel {
  color: white;
  text-shadow: 1px 1px black;
  background: rgba(0,0,0, .35);
}

.card-demo-group {
  float: right;
  width: 30%;
  margin-left: 4em;
  position: relative;
  top: -2em;
}




</style>
