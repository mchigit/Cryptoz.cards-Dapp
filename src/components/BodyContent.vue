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
          <p>Zoombies is deployed on
            <img src="https://zoombies.world/images/moonriver-logo-500.png" style="max-width:7em" />
          </p>
          <p>
            <h2>ZOOM Token Liquidity Sale Event !</h2>
            <p><span class="text-danger">NOTE:</span> the ZOOM ERC20 token in a game utility token for the Zoombies NFT World, <router-link to="/help">please read and understand the mint and burn operations of this token</router-link> before purchase.<br />
              <br/>Holding a sufficient ZOOM token balance will unlock some FREE cards and reduce the minting costs of some Shop NFTs. ZOOM tokens can also be burned to increase the chance of pulling higher rarity cards when minting booster NFTs. Future utility will include ZOOM tokens as a form of health points.
            <div class="btn btn-primary" @click="addZOOMtoMetaMask">Add ZOOM asset to Metamask</div></p>
              <br/>
            <b-container fluid>
              <b-row>
                <b-col sm="12" md="3" lg="3"><strong>Max. 1000 wallets</strong></b-col>
                <b-col sm="12" md="3" lg="3"><strong>Hard Cap: 200 Billion ZOOM</strong></b-col>
                <b-col sm="12" md="3" lg="3"><strong>1 ZOOM = 0.0000001 MOVR</strong></b-col>
                <b-col sm="12" md="3" lg="3"><strong>Min/Max purchase: 1/20 MOVR</strong></b-col>
              </b-row>
              <br/>
              <b-row>
                <b-col class="text-warning">{{zoomWalletsRemaining}} slots remaining</b-col>
                <b-col class="text-warning">{{zoomSold}} sold in World</b-col>
                <b-col class="text-success">Your Purchases: {{myPurchaseTotalLabel}}</b-col>
                <b-col></b-col>
              </b-row>
              <br/>
              <b-row align-h="center">
                <b-col sm="12" md="6" lg="4" class="text-right" style="padding-top:6px"><strong>Total to purchase:</strong> <span class="text-success">{{pendingPurchase}}</span></b-col>
                <b-col sm="12" md="4" lg="2"><b-form-input v-model="totalCzxpToBuy" size="10" maxlength="9" placeholder="enter amount" @keyup="filterCzxpInput" class=""></b-form-input> ZOOM tokens</b-col>
                <b-col sm="12" md="2" lg="4"><input type="submit" class="btn btn-primary" @click="buyCzxp" :disabled="!buyCzxpBtnEnabled">
                </b-col>
              </b-row>
            </b-container>
            <br/><br/><br/>
            <span class="text-warning">Zombies will provision up to a maximum of 2 Billion Zoom to a MOVR-ZOOM swap pool upon sale of equivalent MOVR.</span>
            <br/>
            <span class="text-success">Thank you community, you have met this requirement!</span> we have launched the ZOOM token <router-link to="/market">pool on SushiSwap</router-link>.
          <br/>
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
          <p>The most profitable strategy is to <strong>grow your Affiliate network early</strong> and earn ZOOM tokens for Free :).<br/>
             Click the <strong>Affiliate link in the header</strong> to Share and earn</p>
          <div>
            <h2>Get Started</h2>
            <span
              >To interact with Zoombies you will need to
              <a
                href="https://docs.moonbeam.network/getting-started/moonriver/integrate-metamask/"
                target="_blank"
                >install Metamask configured for Moonriver</a
              >
              and have a small amount of MOVR in your wallet.</span
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
        this.totalCzxpToBuy >= 10000000 &&
        this.totalCzxpToBuy <= 200000000 &&
        this.myPurchaseTotal < 200000000000000000000
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
    myPurchaseTotalLabel() {
      return parseInt(this.myPurchaseTotal/100000000000).toLocaleString();
    }
  },
  mounted() {
    if (this.ZoombiesInstance) {
      this.updateSale();
    }
  },
  watch: {
   ZoombiesInstance(newVal) {
     console.log({newVal})
     if (newVal) {
       this.updateSale();
     }
   },
  },
  methods: {
    addZOOMtoMetaMask: async function() {
      const tokenAddress = '0x8bd5180Ccdd7AE4aF832c8C03e21Ce8484A128d4';
      const tokenSymbol = 'ZOOM';
      const tokenDecimals = 18;
      const tokenImage = 'https://zoombies.world/images/zoombies_coin.svg';

      try {
        // wasAdded is a boolean. Like any RPC method, an error may be thrown.
        const wasAdded = await ethereum.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20', // Initially only supports ERC20, but eventually more!
            options: {
              address: tokenAddress, // The address that the token is at.
              symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
              decimals: tokenDecimals, // The number of decimals in the token
              image: tokenImage, // A string url of the token logo
            },
          },
        });
      } catch (error) {
        console.log('addCZXPtoMetaMask error:',error);
      }
    },
    buyCzxp: async function () {
      //console.log( new web3.utils.BN(this.totalCzxpToBuy).mul(new web3.utils.BN('1000000000000')).toString() );
      let buyinWei = new web3.utils.BN(this.totalCzxpToBuy).mul(new web3.utils.BN('100000000000')).toString();

      await this.CzxpInstance.methods.buy().send({
        from: this.coinbase,
        value: buyinWei,
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
      //console.log(await this.CzxpInstance.methods.totalSupply().call());
      this.zoomWalletsRemaining = 1000 - await this.CzxpInstance.methods.totalContributors().call();
      this.zoomSold = parseInt(await this.CzxpInstance.methods.totalZoomPurchased().call()/1000000000000000000).toLocaleString();
      this.totalCzxpToBuy = "";
      this.movrCost = 0;
      //console.log("contr.total:",await this.CzxpInstance.methods.contributions(this.coinbase).call());
      this.myPurchaseTotal = parseInt(await this.CzxpInstance.methods.contributions(this.coinbase).call());
    },
    filterCzxpInput: function () {
      this.totalCzxpToBuy = this.totalCzxpToBuy.replace(/[^\d]/g, "");
      if( this.myPurchaseTotal + parseInt(this.totalCzxpToBuy * 100000000000) > 20000000000000000000 ){
        this.totalCzxpToBuy = (20000000000000000000 - this.myPurchaseTotal) /100000000000;
      }

      this.movrCost = parseFloat(this.totalCzxpToBuy / 10000000).toFixed(7);
    },
  },
  watch: {
    ZoombiesInstance(newVal) {
      if (newVal) {
        this.updateSale();
      }
    },
  }
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
