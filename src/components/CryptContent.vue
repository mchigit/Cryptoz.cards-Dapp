<template>
  <div>
        
        <main role="main" class="container">
        <div class="jumbotron">
          <h1>My Crypt</h1>
          <p>This is where all your Cryptoz cards can be accessed. From here you can sort your cards, search your cards and sacrifice. Sacrificing is permanent. Not only in your wallet, but across the entire Cryptoz Universe. That unique item is gone forever.</p>
          
          <!-- Loads cards here -->
          <div v-if="ownsCards == 0">
            <h2>You do not own any cards yet</h2>
            <router-link to="/help">How do I get Cryptoz cards ?</router-link>
          </div>
          <div v-else>
            <p>Sort | Search</p>
            Yay you own cards ! show them here
          </div>
        </div>
      </main>
  </div>
</template>

<script>
export default {
  name: 'CryptContent',
  data () {
    return {
      msg: 'Here we go, here we go',
      ownsCards : 1
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>