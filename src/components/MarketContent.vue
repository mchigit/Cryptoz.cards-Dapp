<template>
  <div>
    <div class="jumbotron">
      <div class="page-title">
        <h1>Markets</h1>
      </div>

      <b-card class="market-card" no-body>
        <b-tabs fill card>
          <b-tab title="Zoombies NFT Cards" active>
            <h3>Zoombies NFT Cards</h3>
            <h5>
              ERC-721 NFT tokens are supported on the following auction
              marketplaces
            </h5>
            <br/><br/><br/>
            Check back for market integrations
            <br/><br/><br/>

  
          </b-tab>
          <b-tab title="ZOOM token">
            <h3>
            ZOOM
            <img
              class="czxp-logo"
              src="https://zoombies.world/images/zoombies_coin.svg"
            />
              token
            </h3>
            <h5>
              ERC-20 compliant ZOOM tokens are supported on the following token exchanges
            </h5>
            <br/><br/><br/>
            Check back for market integrations
            <br/><br/><br/>


          </b-tab>
        </b-tabs>
      </b-card>

      <p>
        If you have an NFT market on Moonriver and would like to
        feature Zoombies NFT World Cards, you can use the contract TokenURI endpoints
        for automated metadata consumption. We currently follow the OpenSea
        metadata standard. For inquires
        <a href="mailto:contactus@zoombies.world?subject=NFT market integrations"
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
