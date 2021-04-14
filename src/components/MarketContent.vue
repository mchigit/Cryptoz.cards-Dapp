<template>
  <div>
    <div class="jumbotron">
      <div class="page-title">
        <h1>Markets</h1>
      </div>

      <b-card class="market-card" no-body>
        <b-tabs fill card>
          <b-tab title="Cryptoz NFT Cards" active>
            <h3>Cryptoz NFT Cards</h3>
            <h5>
              BEP-721 NFT tokens are supported on the following auction
              marketplaces
            </h5>
            <div class="markets-wrapper">
              <b-card class="market" no-body>
                <a
                  class="market-btn"
                  href="https://whalecrate.com/browse/cryptoz"
                  target="_blank"
                >
                  <div class="market-info">
                    <div class="market-img">
                      <img
                        class="logo"
                        src="https://whalecrate.com/logo-wide.svg"
                        align="absmiddle"
                      />
                    </div>
                    <div class="market-detail">
                      <h2>Whalecrate</h2>
                      <p>
                        Buy and sell curated digital items across multiple
                        chains.
                      </p>
                    </div>
                  </div>
                </a>
              </b-card>
              <b-card class="market" no-body>
                <a
                  class="market-btn"
                  href="https://www.aotoy.club/#/market"
                  target="_blank"
                >
                  <div class="market-info">
                    <div class="market-img">
                      <img
                        class="logo"
                        src="https://www.aotoy.club/img/logo.4e931c7f.svg"
                        align="absmiddle"
                      />
                    </div>
                    <div class="market-detail">
                      <h2>AOTOY - BSC NFT Platform</h2>
                      <p>
                        Easily mint, collect, and trade your NFT, all on aotoy,
                        the NFT platform deployed on the BSC.
                      </p>
                    </div>
                  </div>
                </a>
              </b-card>

              <b-card class="market" no-body>
                <a
                  class="market-btn"
                  href="https://treasureland.market/#/nft-market/cryptoz?sellingType=0&priceType=0&title=0&sortValue=1&page=1&project=20"
                  target="_blank"
                >
                  <div class="market-info">
                    <div class="market-img">
                      <img
                        id="treasureland-logo"
                        src="https://treasureland.market/static/media/logo.849b6817.svg"
                        align="absmiddle"
                      />
                    </div>
                    <div class="market-detail">
                      <h2>TreasureLand</h2>
                      <p>Frictionless NFT trading market.</p>
                    </div>
                  </div>
                </a>
              </b-card>
            </div>
          </b-tab>
          <b-tab title="CryptoZ eXPerience">
            <h3>
              CryptoZ eXPerience (CZXP
              <img
                class="czxp-logo"
                src="./assets/cryptokeeper_coin_binance.svg"
              />)
            </h3>
            <h5>
              BEP-20 tokens are supported on the following token exchanges
            </h5>

            <div class="markets-wrapper">
              <b-card class="market" no-body>
                <a
                  class="market-btn"
                  href="https://info.julswap.com/token/0x2b974da27c9dd35412d71dd36e3e108486c45444"
                  target="_blank"
                >
                  <div class="market-info">
                    <div class="market-img">
                      <img
                        class="uni-logo"
                        src="https://pbs.twimg.com/media/ExUNkLKVEAIabAW.jpg"
                        align="absmiddle"
                      />
                    </div>
                    <div class="market-detail">
                      <h2>JulSwap</h2>
                      <p>
                        JulSwap fully decentralized and powered by the Community
                        Governance.
                      </p>
                    </div>
                  </div>
                </a>
              </b-card>
              <b-card class="market" no-body>
                <a
                  class="market-btn"
                  href="https://1inch.exchange/#/CZXP/BNB"
                  target="_blank"
                >
                  <div class="market-info">
                    <div class="market-img oneinch-exchange">
                      <img
                        class="uni-logo"
                        src="https://downloads.intercomcdn.com/i/o/241617/dc6bdc1d7b1bc0d6c33e904b/e1486b777bc88ddcdf2649b668e9fbcd.png"
                        align="absmiddle"
                      />
                    </div>
                    <div class="market-detail">
                      <h2>1inch Exchange</h2>
                      <p>
                        1inch offers the best rates by discovering the most
                        efficient swapping routes across all leading DEXes.
                      </p>
                    </div>
                  </div>
                </a>
              </b-card>
            </div>
          </b-tab>
        </b-tabs>
      </b-card>

      <p>
        If you have an NFT market on the Binance Smart Chain and would like to
        feature Cryptoz NFT Cards, you can use the contract TokenURI endpoints
        for automated metadata consumption. We currently follow the OpenSea
        metadata standard. For inquires
        <a href="mailto:contactus@cryptoz.cards?subject=NFT market integrations"
          >please contact us</a
        >
      </p>
    </div>
  </div>
</template>

<script>
import { BCard, BTabs, BTab } from "bootstrap-vue";

export default {
  name: "MarketContent",
  components: {
    BCard,
    BTab,
    BTabs,
  },
  data() {
    return {
      msg: "Here we go, here we go",
    };
  },
};
</script>
<style scoped lang="scss">
.page-title {
  margin-top: 36px;
}
#treasureland-logo {
  height: 45px;
}

.uni-logo {
  height: 20px;
  margin-bottom: 10px;
}
.czxp-logo {
  height: 30px;
}
.market-btn:hover {
  color: #000;
  background-color: #ccc;
  padding: 10px;
  max-height: fit-content;
  text-decoration: none;
  border: 1px solid black;
}
a:hover {
  text-decoration: none;
}
.market-btn {
  color: #000;
  padding: 10px;
  text-decoration: none;
  max-height: fit-content;
  border: 1px solid white;
}
h3 {
  margin-bottom: 1em;
}

.jumbotron {
  margin: auto;
  width: 95%;
}

.markets-wrapper {
  margin-top: 24px;
}

.market-info {
  display: flex;
  flex-direction: column;
}

.market-img {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;

  img {
    width: 200px;
    height: 90px;
  }
}

.market {
  margin-top: 16px;
}

.market-detail {
  margin-left: 20px;

  h2 {
    font-size: 18px;
  }
}

.market-card {
  margin-top: 24px;
  margin-bottom: 24px;
}

.oneinch-exchange {
  background-color: lightgray;
}

@media only screen and (min-width: 1300px) {
  .markets-wrapper {
    display: grid;
    grid-template-columns: 50% 50%;
    grid-gap: 16px;
  }

  .market-img {
    margin-bottom: 0;
    img {
      width: 120px;
      height: 80px;
    }
  }

  .market {
    width: 550px;
    height: 120px;
    justify-self: center;

    .market-btn {
      height: 100%;

      .market-info {
        height: 100%;
        flex-direction: row;
      }
    }
  }

  .uni-logo {
    height: 40px;
    margin-bottom: 10px;
  }
}
</style>
