<template>
  <div id="app">
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <img class="logo-nav" src="./assets/cryptokeeper_logo.svg" width="4%" />
        <router-link class="navbar-brand" to="/">Cryptoz</router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav mr-auto">
            <li>
              <router-link to="/shop">Shop</router-link>
            </li>
            <li>
              <router-link to="/crypt">Your Crypt</router-link>
            </li>
            <li>
              <router-link to="/market">Markets</router-link>
            </li>
            <li>
              <router-link to="/view/1">View</router-link>
            </li>
          </ul>
          
          <div class="bonusClass" v-if="bonusReady == 1" v-on:click="GetBonus">
            Claim FREE Boosters !
          </div>
          <div class="bonusClassNo" v-else-if="bonusReady == 0">
            Next Booster Bonus:<strong> 2 hours 10 mins</strong>
          </div>
          <div class="bonusClassLogIn" v-else>
            Log in to claim <strong>FREE</strong> Daily boosters -->
          </div>
          
          
          <transition name="fade" mode="out-in">
            
            <p class="mm-header" v-if="network_state === 0">
              Metamask is <strong>required</strong> to bridge Cryptoz on Ethereum
              <a href="https://metamask.io/" target="_blank">
                <img src="static/metamask_logo.png" width="40%" />
              </a>
            </p>
            
            <button class="btn btn-danger" v-else-if="network_state === 1" v-on:click="$emit('doLogin')">Connect with MetaMask</button>
            
            <span class="wallet-nav" v-else><strong>ETH Wallet :</strong> {{wallet}}
            </span>
          
          </transition>
          
          <span>
            <router-link to="/help">Help</router-link>
          </span>
        </div>
      </nav>
      <p></p>
      
      </div>
</template>

<script>
export default {
  name: 'AppHeader',
  data () {
    return {
      showLogin : 1,
      bonusReady : 0,
    }
  },
  props : ['network_state','wallet'],
  mounted () {
    //first check if the dapp is authed and logged in
    console.log('AppHeader mounted...')
    
      this.$root.$on('userLoggedIn', () => {
        console.log('hey userLoggedIn event in Header!')
        //console.log(window.account)
        console.log('userLoggedIn...AppHeader..run subscriptions');
        //this.$root.$off('userLoggedIn')
        //enable the button
        this.setSubscriptions();
      })

    //if the user has logged, start it up
    if(typeof(window.account) !== undefined){
      this.setSubscriptions()
    }
      
  },
  methods : {
    setSubscriptions : function() {
      //Lets do a check for the Daily bonus'
      
    },
    GetBonus : function() {
      console.log('GetBonus called...');
      Cryptoz.deployed().then(function(instance) {
        return instance.getBonusBoosters({from: account,gas:362000});
      }).then(function(res) {
        console.log(res);
      })
    }
  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .router-link-active {
    color:#ffffff;
  }
  
  .mm-header {
    color: #fff;
    text-align: right;
    margin-right: 10px;
    width: 23em;
  }

  .logo-nav{
    margin-right: 1.6em;
  }

  .wallet-nav{
    color: #fff;
    margin-right: 10px;
  }
  li{
    margin-right: 1.2em;
  }
  a{
    padding:5px;
  }
  
  a:hover{
    color:#FFF;
    text-decoration: none;
    border: 1px solid #fff;
    padding:4px;
  }
  
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .bonusClass{
    color:#00FF00;
    margin-right: 3.2em;
  }
  
  .bonusClassNo{
    color:#f7162c;
    margin-right: 3.2em;
  }
  
  .bonusClassLogIn{
    color:#ffff00;
    margin-right: 3.2em;
  }
</style>