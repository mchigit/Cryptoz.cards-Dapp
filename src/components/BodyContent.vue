<template>
  <div>
        <main role="main" class="container">
        <div class="jumbotron">
          <h1>The Cryptoz Universe</h1>
          <p class="lead">Cryptoz is an Ethereum blockchain based collectibles trade game.</p>
          <img class="img-responsive card-demo-group" src="@/assets/cryptokeeper_card_types.png" />
          <p>
            The goal is to collect the undead and earn or trade ERC-20 Cryptoz eXPerience (CZXP) tokens to unlock new levels. Each ERC-721 Cryptoz card is a unique token on the Ethereum blockchain. Collectors can buy, sell, and exchange both their Cryptoz cards and CZXP tokens through any standards compliant wallets, markets, game engines,  exchanges, DeFi and other future inventions.
          </p>
          <div>
            <h2>Get Started</h2>
            <span>To interact with Cryptoz you will need to <a href="https://metamask.io/" target="_blank">install Metamask</a> and have a small amount of Ether in your account.</span>
          </div>
          <p>
            Ethereum Cryptoz token collecting and trading is an exciting and new opportunity for classic and modern collectors alike. What makes this platform unique compared to other online digital asset based games or systems are:
          </p>
          <ul>
            <li>Cryptoz Cards functions and data are a set of Smart Contracts that run independantly of the creators. There is no OFF switch. The Cryptoz Universe will live forever on Ethereum</li>
            <li>The developers can not tamper or change the Card types once they are loaded. i.e: no re-minting rare cards</li>
            <li>The cards are truly unique, owned and transferable between wallets manaully or automated through NFT auction marketplaces.</li>
          </ul>
          <p><router-link to="/help">Visit the Help section</router-link> of our website to read more</p>
      </div>
      </main>
  </div>
</template>

<script>
export default {
  name: 'BodyContent',
  data () {
    return {
      msg: 'Here we go, here we go'
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