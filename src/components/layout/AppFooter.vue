<template>
  <div class="hello">
    <!-- Footer -->
    <footer class="page-footer font-small blue pt-4">
      <!-- Footer Links -->
      <div class="container-fluid text-center text-md-left">
        <!-- Grid row -->
        <div class="row">
          <!-- Grid column -->
          <div class="col-md-6 mt-md-0 mt-3">
            <!-- Content -->
            <img class="img-fluid dev-logo" src="./../assets/cardinal.png" />
            <p v-if="isConnected">You are connected to: {{ network }}</p>

            <div class="col-md-6 mt-md-0 mt-3">
              <a
                :class="classObject"
                href="https://blockscout.moonriver.moonbeam.network/address/0x8bd5180Ccdd7AE4aF832c8C03e21Ce8484A128d4/transactions"
                target="_blank"
                >ZOOM token Contract - 0x8bd5180Ccdd7AE4aF832c8C03e21Ce8484A128d4</a
              >
              <br />
              <a
                :class="classObject"
                href="https://blockscout.moonriver.moonbeam.network/address/0x08716e418e68564C96b68192E985762740728018/transactions"
                target="_blank"
                >Zoombies NFT Contract - 0x08716e418e68564C96b68192E985762740728018
                </a
              >
            </div>
          </div>
          <!-- Grid column -->

          <hr class="clearfix w-100 d-md-none pb-3" />

          <b-modal id="terms-of-use" title="Zoombies.world Terms of Use">
            <p class="my-4">
              By using this site you Agree and understand the following Terms of Use:
              <ul>
                <li>Smart contracts, blockchain decentralized applications are all new experimental technology. While Cardinal Entertainment will take every reasonable measure to provide the highest quality experience.<br/>
                   By the continued use of this website you accept and assume all risk release Cardinal Entertainment, and all persons associated with it from any legal recourse.</li>
              </ul>
            </p>
          </b-modal>

          <!-- Grid column -->
          <div class="col-md-3 mb-md-0 mb-3">
            <!-- Links -->
            <h5 class="text-uppercase">Links</h5>

            <ul class="list-unstyled">
              <li>
                <a
                  class="twitter-follow-button"
                  data-show-count="false"
                  href="https://twitter.com/CryptozNFT"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  :class="classObject"
                  href="https://cryptoz-cards.medium.com/"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  :class="classObject"
                  href="https://t.me/zoombiesnews"
                  target="_blank"
                  >Telegram Announcements</a
                >
              </li>
              <li>
                <a
                  :class="classObject"
                  href="https://t.me/zoombiesworld"
                  target="_blank"
                  >Zoombies Telegram Group</a
                >
              </li>
            </ul>
          </div>
          <!-- Grid column -->

          <!-- Grid column -->
          <div class="col-md-3 mb-md-0 mb-3">
            <!-- Links -->
            <h5 class="text-uppercase">Support Us</h5>

            <ul class="list-unstyled">
              <li>
                <a
                  :class="classObject"
                  href="https://commerce.coinbase.com/checkout/1dfd66a1-a393-4c06-8036-d402441c7b19"
                  target="_blank"
                  >Donations</a
                >
              </li>
              <li>
                <a
                  :class="classObject"
                  href="https://www.zazzle.com/store/zombiepets"
                  target="_blank"
                  >Cool Swag</a
                >
              </li>
              <li>
                <a href="#!" v-b-modal.terms-of-use>Terms of Use</a>
              </li>
              <!--
              <li>
                <a href="#!">Link 4</a>
              </li-->
            </ul>
          </div>
          <!-- Grid column -->
        </div>
        <!-- Grid row -->
      </div>
      <!-- Footer Links -->

      <!-- Copyright -->
      <div class="footer-copyright text-center py-3">
        © 2021 Copyright Cardinal Entertainment
      </div>
      <!-- Copyright -->
    </footer>
    <!-- Footer -->
  </div>
</template>

<script>
import { NETWORKS } from "../../util/constants/networks";
import dAppStates from "@/dAppStates";

export default {
  name: "AppFooter",
  props: [],
  data() {
    return {
      // 0 - detecting, 1 - no metamask, 2- mm installed , show network
    };
  },
  computed: {
    classObject: function () {
      const chainId = this.$store.state.web3.chainId;
      switch (chainId) {
        case 0x38:
        case 0x61:
          return "bsc-link";
        default:
          return "eth-link";
      }
    },
    isConnected() {
      return (
        this.$store.state.dAppState === dAppStates.CONNECTED ||
        this.$store.state.dAppState === dAppStates.WALLET_CONNECTED
      );
    },
    network() {
      let hexString;
      if (this.$store.state.web3.chainId) {
        hexString = `0x${this.$store.state.web3.chainId.toString(16)}`;
      }
      if (!hexString) return "Unidentified Network";
      return NETWORKS[hexString];
    },
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
footer {
  color: #fff;
  width: 100%;
  height: 100%;
  background-color: #301748 !important;
  box-shadow: 0 50vh 0 50vh #343a40;
}
.dev-logo {
  width: 28%;
  padding: 0px 0px 10px;
}
/* BINANCE color #F0B90B */
.bsc-link {
  color: #f0b90b;
}
</style>
