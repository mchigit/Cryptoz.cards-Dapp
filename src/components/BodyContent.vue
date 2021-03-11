<template>
  <div>
        <main role="main" class="container">
        <div class="jumbotron">
          <h1>The Cryptoz NFT Universe</h1>
          <p class="lead">Cryptoz is a BSC blockchain based NFT collectibles trade game.</p>
          <img class="img-responsive card-demo-group" src="@/assets/cryptokeeper_card_types.png" />
          <p>
          <h2>The CryptoZ eXPerience Token Generation Event is LIVE</h2>
            <form class="form-inline">
                <div class="mx-sm-3 mb-2">( Max. 1 BNB per wallet )
                    <input id="czxp-amt" class="form-control" type="text" placeholder="Enter spend amount" v-model="totalCzxpToBuy" v-on:input="totalCzxpToBuy = $event.target.value" v-on:keyup="filterCzxpInput">
                </div>
                <button id="buy-czxp-btn" type="button" class="btn btn-success" v-on:click="buyCzxp" v-bind:disabled="buyCzxpBtnEnabled == false">Buy CZXP tokens
                </button><br/><br/>
                <p>1 BNB = 10,000,000 CZXP ( used to unlock minting Shop Cards )<br/>
                    The TGE is hard capped at 100 wallets.
                </p>
            </form>
          </p>
          <p>
            The goal is to collect the rare and unique undead NFT cards, earn or trade ERC-20 Cryptoz eXPerience (CZXP) tokens to unlock new levels. Each minted NFT Cryptoz card is a unique token on the Binance Smart Chain. Collectors can buy, sell, and exchange both their Cryptoz NFT cards and CZXP tokens through any standards compliant wallets, markets, game engines,  exchanges, DeFi and other future inventions.
          </p>
          <div>
            <h2>Get Started</h2>
            <span>To interact with Cryptoz you will need to <a href="https://metamask.io/" target="_blank">install Metamask</a> and have a small amount of BNB in your account.</span>
          </div>
          <p>
             NFT token collecting and trading is an exciting and new opportunity for classic and modern collectors alike. What makes this platform unique compared to other online digital asset based games or systems are:
          </p>
          <ul>
            <li>Cryptoz NFT Card functions and data are a set of Smart Contracts that run independantly of the creators. There is no OFF switch. The Cryptoz NFT Universe will live forever on the Binance Smart Chain</li>
            <li>The developers can Not tamper or change the Card types once they are loaded. i.e: no re-minting scarce NFTs</li>
            <li>The NFTs are truly unique, owned and transferable between wallets manaully or automated through NFT auction marketplaces.</li>
          </ul>
          <p><router-link to="/help">Visit the Help section</router-link> of our website to read more</p>
      </div>
      </main>
  </div>
</template>

<script>
export default {
    name: 'BodyContent',
    computed : {
        buyCzxpBtnEnabled() {
                        if(this.totalCzxpToBuy !== "" && this.totalCzxpToBuy >= 0.00001 && this.totalCzxpToBuy <= 1){
                return true;
            }else{
                return false;
            }
        },
        coinbase() {
            return this.$store.state.web3.coinbase;
        },
    },
    data () {
        return {
            msg: 'Here we go, here we go',
            totalCzxpToBuy : '',
        }
    },
    methods: {
        buyCzxp : function() {
            //console.log("buy cxzp clicked !", this.totalCzxpToBuy, this.coinbase);
            window.CzxpToken.deployed().then((instance) => {
                return instance.buy({from: this.coinbase, value:(this.totalCzxpToBuy*1000000000000000000)});
            }).then((res) => {
                console.log(res);
            })
        },
        filterCzxpInput : function() {
            this.totalCzxpToBuy = this.totalCzxpToBuy.replace(/[^0-9\.]/g,'');
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .card-demo-group{
    float: right;
    width: 30%;
    margin-left: 4em;
    position: relative;
    top: -2em;
  }
</style>