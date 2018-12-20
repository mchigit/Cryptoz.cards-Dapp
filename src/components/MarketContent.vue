<template>
  <div>
        
        <main role="main" class="container">
        <div class="jumbotron">
          <h1>Markets</h1>
          <p>Cryptoz are supported on the following markets</p>
          
          <a href="https://opensea.io/" target="_blank">
            <img class="opensea-logo" src="https://opensea.io/static/images/logos/opensea-logo.png" align="absmiddle" /> <span class="opensea-header">OpenSea</span>
          </a>
          <br>
          <p>The world’s largest digital marketplace for crypto collectibles.<br> Buy, sell, and discover exclusive digital assets.
          </p>
            
        </div>
      </main>
  </div>
</template>

<script>
export default {
  name: 'MarketContent',
  data () {
    return {
      msg: 'Here we go, here we go'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .opensea-header {
    font-size : 2rem!important;
    margin-left : 10px;
  }
  .opensea-logo {
    width : 10%;
    margin-bottom : 10px;
  }
</style>