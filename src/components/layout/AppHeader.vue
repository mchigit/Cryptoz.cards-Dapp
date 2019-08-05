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
          
          
              <p>Metamask: {{ web3.isInjected }}</p>
              <p>Network: {{ web3.networkId }}</p>
              <p>Account: {{ web3.coinbase }}</p>
              <p>Balance: {{ web3.balance }}</p>
          
          <div class="bonusClass" v-if="bonusReady == 1" v-on:click="GetBonus">
            Claim 2 FREE Boosters !
          </div>
          <div class="bonusClassNo" v-else-if="bonusReady == 0">
            Your Next Bonus:<br><strong> {{timeToBonus}}</strong>
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
            
            <button class="btn btn-danger" v-else-if="network_state === 1" v-on:click="$emit('doLogin')">Log in with MetaMask</button>
            
            <span class="wallet-nav" v-else>
              <strong>ETH Wallet :</strong> {{wallet}}
              <span class="wallet-balance"> E: {{wallet_balance}} </span>
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
  beforeCreate () { //Initialize the app
    console.log('registerWeb3 Action dispatched from App.vue')
    this.$store.dispatch('registerWeb3')
  },
  computed: {
    web3 () {
      return this.$store.state.web3
    }
  },
  data () {
    return {
      showLogin : 1,
      bonusReady : 2,
      timeToBonus : 0,
    }
  },
  props : ['network_state','wallet', 'wallet_balance'],
  mounted () {
    //first check if the dapp is authed and logged in
    console.log('AppHeader mounted...')
/**
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
**/
  },
  methods : {
    setSubscriptions : function() {
      //Lets do a check for the Daily bonus'
      console.log('Check if the bonus is available for this playa..');
      
      var self = this
      
      Cryptoz.deployed().then(function(instance) {
        return instance.getTimeToDailyBonus(account);
      }).then(function(res) {
        //console.log('Time to next bonus is:');
        //console.log(res.c[0]*1000);
        var timeToBonusInMilli = res.c[0]*1000;
        var now = new Date();
        //console.log('now is ' + now.getTime());
        
        if(now.getTime() >= timeToBonusInMilli){
          self.bonusReady = 1; //Claim bonus state
        }else{
          self.bonusReady = 0; //countdown to bonus state
          self.timeToBonus = self.GetTimeString(res.c[0]*1000);
        }
      })
      
    },
    GetBonus : function() {
      console.log('GetBonus called...');
      var self = this;
      Cryptoz.deployed().then(function(instance) {
        return instance.getBonusBoosters({from: window.account, gas:362000});
      }).then(function(res) {
        console.log('getBonusBoosters called result should be T/F :');
        console.log(res);
        if(res = 'true'){
          self.setSubscriptions();// refresh the clock
        }
      })
    },
    GetTimeString: function(_timeStamp) {
      
        var t     = new Date(_timeStamp),
        hours     = t.getHours(),
        min       = t.getMinutes() + '',
        pm        = false,
        months    = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      if(hours > 11){
        hours = hours - 12;
        pm = true;
      }

      if(hours == 0) hours = 12;
      if(min.length == 1) min = '0' + min;

      //return months[t.getMonth()] + ' ' + t.getDate() + ', ' + t.getFullYear() + ' ' + hours + ':' + min + ' ' + (pm ? 'pm' : 'am');
      return months[t.getMonth()] + ' ' + t.getDate() + ' at ' + hours + ':' + min + ' ' + (pm ? 'pm' : 'am');
    },
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
    color: #d48b15;
    margin-right: 10px;
  }
  
  li{
    margin-right: 1.2em;
  }
  a{
    
    padding: 2px;
  }
  
  a:hover{
    color:#FFF;
    text-decoration: none;
    border: 1px solid #fff;
    padding:1px;
  }
  
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .bonusClass{
    color:#00FF00;
    margin-right: 1.8em;
  }
  
  .bonusClassNo{
    color:#f7162c;
    margin-right: 2.2em;
  }
  
  .bonusClassLogIn{
    color:#ffff00;
    margin-right: 3.2em;
  }
</style>