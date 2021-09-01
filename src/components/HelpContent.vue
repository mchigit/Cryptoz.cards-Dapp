<template>
  <div>
    <main role="main" class="container">
      <!--
        brown       - 585858
        light blue  - 03c1e8
        red         - d5005a
        purple      - b92ee4
    -->
      <div class="jumbotron">
        <h1>Frequently Asked Questions</h1>
        <p><span class="text-danger"><strong>NOTE:</strong></span> Please read all of the information below in detail, there are inherent risks with Cryptocurrency, NFTs and tokenomics. Know your limits and don't risk more than you are willing to lose.</p>
        <div class="accordion" role="tablist">
          <b-card no-body class="mb-1">
            <b-card-header
              header-tag="header"
              class="accordion-header"
              role="tab"
            >
              <b-button v-b-toggle.accordion-1 block class="accordion-button">
                How do I Play?
              </b-button>
            </b-card-header>
            <b-collapse
              id="accordion-1"
              visible
              accordion="my-accordion"
              role="tabpanel"
            >
              <b-card-body>
                <div class="card-body">
                  You will need:
                  <ul>
                    <li>
                      The
                      <a
                        href="https://metamask.io/"
                        target="_blank"
                        >Metamask</a
                      >
                      Chrome browser extension, <a href="https://trustwallet.com/" target="_blank">Trust Wallet ( mobile )</a> or other Moonriver compatibile wallet
                    </li>
                    <li>
                      A balance of MOVR ( the cryptocurrency of Moonriver
                      ) from KuCoin or Kraken U.S</a>.
                    </li>
                  </ul>
                  <p>
                    You may then Log in with your wallet and
                    <router-link to="/shop"> Shop </router-link> for Booster
                    cards, buy limited edition cards and claim Free limited
                    editions cards from
                    <router-link to="/shop"> the Minting Shop. </router-link>
                    You may then browse the contents of
                    <router-link to="/my-zoombies-nfts">
                      Your NFT Crypt </router-link
                    >, sacrifice cards from your Crypt for ZOOM tokens, or gift
                    them to other Moonriver wallets. If you would like to
                    <router-link to="/market"> auction </router-link> your
                    Zoombies NFTs , you may list them on
                    <router-link to="/market">
                      supported marketplaces </router-link
                    >. You can also trade and sell your ZOOM on supported
                    <router-link to="/market">
                      Moonriver token exchanges.
                    </router-link>
                  </p>
                </div>
              </b-card-body>
            </b-collapse>
          </b-card>

          <b-card no-body class="mb-1">
            <b-card-header
              header-tag="header"
              class="accordion-header"
              role="tab"
            >
              <b-button v-b-toggle.accordion-1-5 block class="accordion-button">
                How do I read the cards?
              </b-button>
            </b-card-header>
            <b-collapse
              id="accordion-1-5"
              accordion="my-accordion"
              role="tabpanel"
            >
              <b-card-body>
                <div class="card-body">
                  <img src="./assets/legend_zoombies.jpg" />
                </div>
                <p />
                <h2>Default Mint Booster NFT Rarity Distribution</h2>
                <p>
                  The default rarity distribution for each Booster card pull is as
                  follows:
                </p>
                <ul>
                  <li>
                    <span
                      class="rarity-labels"
                      style="background-color: #c0c0c0"
                      >Platinum</span
                    >
                    - O - This type is not available for purchase or from a
                    booster
                  </li>
                  <li>
                    <span
                      class="rarity-labels"
                      style="background-color: #b92ee4"
                      >Epic</span
                    >
                    - 1 in 10000 - This is like pulling a unicorn.
                  </li>
                  <li>
                    <span
                      class="rarity-labels"
                      style="background-color: #d5005a"
                      >Rare</span
                    >
                    - 499 in 10000 - These red cards are still very rare and
                    should be handled with care
                  </li>
                  <li>
                    <span
                      class="rarity-labels"
                      style="background-color: #03c1e8"
                      >Uncommon</span
                    >
                    - 2999 in 10000 - These when they occur, they are a nice
                    little surprise
                  </li>
                  <li>
                    <span
                      class="rarity-labels"
                      style="background-color: #585858"
                      >Common</span
                    >
                    - 6501 in 10000 - The editions on these will count up fairly
                    quickly as NFTs get minted
                  </li>
                </ul>
                <br/>
                <h2>Wager Mint Booster NFT Rarity Distribution</h2>
                You may wager to burn ZOOM tokens to increase the probability of minting a more rare NFT.<br/>
                The minimum wager is 1,000,000 ZOOM tokens<br/>
                The maximum wager is 20,000,000 ZOOM tokens<br/>
                Using the Probability slider, you can review the change before confirming the wager.<br/><br/>
                <p>
                  <b-form-input
                      v-model="wagerSample"
                      class="form-control"
                      required
                      type="range"
                      min="0"
                      max="20000000"
                      step="1"
                  />
                  Example ZOOM token burn wager: {{parseInt(wagerSample).toLocaleString()}}
                </p>
                <strong>NOTE: The ZOOM tokens used in the wager are permanently burned with no chance to return.</strong>

              </b-card-body>
            </b-collapse>
          </b-card>

          <b-card no-body class="mb-1">
            <b-card-header
              header-tag="header"
              class="accordion-header"
              role="tab"
            >
              <b-button v-b-toggle.accordion-2 block class="accordion-button">
                How can I get MOVR?
              </b-button>
            </b-card-header>
            <b-collapse
              id="accordion-2"
              accordion="my-accordion"
              role="tabpanel"
            >
              <b-card-body>
                <div class="card-body">
                  <p>You will need to buy MOVR or have it sent to your wallet. For more information, follow the offical Announcements
                  from the <a href="https://moonbeam.foundation/" target="_blank">Moonbeam Foundation</a>.
                  <br/>
                  You can trade for MOVR tokens at these exchanges <a href="https://www.kucoin.com/" target="_blank">KuCoin</a> or <a href="https://www.kraken.com/" target="_blank">Kraken</a>.
                  </p>
                  As of this writing, the transaction cost (gas) by Moonriver blockchain to interact with Zoombies will cost approx $0.30 to
                  ?? USD per transaction, depending on how fast you would
                  like the transactions confirmed and what exactly you are
                  trying to do.
                  <br />
                  This fee is not charged by the Zoombies contract, but by the
                  Moonriver platform to execute contract code for you
                  by you on this massive worldscale blockchain.
                </div>
              </b-card-body>
            </b-collapse>
          </b-card>

          <b-card no-body class="mb-1">
            <b-card-header
              header-tag="header"
              class="accordion-header"
              role="tab"
            >
              <b-button v-b-toggle.accordion-3 block class="accordion-button">
                What are sponsor affiliates?
              </b-button>
            </b-card-header>
            <b-collapse
              id="accordion-3"
              accordion="my-accordion"
              role="tabpanel"
            >
              <b-card-body>
                <div class="card-body">
                  <p>
                    The Zoombies World will reward sponsors who have been
                    associated to an affiliate. This affiliation is permanent
                    and cannot be unmade. You may only have 1 sponsor, but may
                    have any number of affiliates.<br /><br />There are a number
                    of affiliate player actions that will generate a 20% ZOOM                     <img
                                          class="czxp-logo"
                                          src="https://zoombies.world/images/zoombies_coin.svg"
                                        /> token
                    reward for their sponsor.
                  </p>
                  <ul>
                    <li>Buy Booster Credits</li>
                    <li>Buy and Mint a Booster NFT</li>
                    <li>Mint a limited edition card from the Shop</li>
                    <li>Mint a Free limited edition card from the Shop</li>
                  </ul>
                  <p>
                    Click the Sponsors link in the menu to copy your Afilliate
                    URL to share with others and start earning ZOOM tokens today !
                  </p>
                </div>
              </b-card-body>
            </b-collapse>
          </b-card>

          <b-card no-body class="mb-1">
            <b-card-header
              header-tag="header"
              class="accordion-header"
              role="tab"
            >
              <b-button v-b-toggle.accordion-4 block class="accordion-button">
                What are ZOOM and NFT tokens?
              </b-button>
            </b-card-header>
            <b-collapse
              id="accordion-4"
              accordion="my-accordion"
              role="tabpanel"
            >
              <b-card-body>
                <div class="card-body">
                  <p>The Zoombies World utilize 2 types of ERC type tokens:</p>
                  <p>
                    <img
                      class="czxp-logo"
                      src="https://zoombies.world/images/zoombies_coin.svg"
                    />
                    <strong>ZOOM Tokens</strong> are ERC-20
                    Fungible tokens. This means that any ZOOM is exchangeable
                    with any other ZOOM token and none are unique. If your wallet contains a sufficient amount of ZOOM tokens
                    each Shop card will automatically determine if it will unlock and display the FREE minting button and cost pricing values.<br/>
                    If you do Not have the required Zoom token balance a <img src="https://upload.wikimedia.org/wikipedia/commons/e/e5/Emojione_1F680.svg" class="rocket-fp-icon" /> Fast Pass icon will appear on the minting button, as a way to bypass the Zoom requirement to mint NFT at 3x the base cost.
                    Each Shop card displays the amount of ZOOM required to unlock this feature in the bottom left
                    <div class="btn btn-primary" @click="addCZXPtoMetaMask">Add ZOOM to Metamask</div>
                  </p>
                  <p>
                    <strong>Zoombies</strong> the cards themselves are ERC-721
                    Non-Fungible tokens (NFTs). This means that each card is minted as a
                    unique NFT token. Even the Unlimited Booster cards that are
                    minted in an infinite supply are each unique, they have a
                    unique token number and a unique edition number.
                  </p>
                </div>
              </b-card-body>
            </b-collapse>
          </b-card>

          <b-card no-body class="mb-1">
            <b-card-header
              header-tag="header"
              class="accordion-header"
              role="tab"
            >
              <b-button v-b-toggle.accordion-5 block class="accordion-button">
                How many types of Zoombies are available and how do they release ?
              </b-button>
            </b-card-header>
            <b-collapse
              id="accordion-5"
              accordion="my-accordion"
              role="tabpanel"
            >
              <b-card-body>
                <div class="card-body">
                  <p>The <router-link to="/shop"> Shop </router-link> will show you
                  the current total number of Zoombies types available at the
                  current time. We will continue to load new sets containing
                  approx 10-20 cards every month until we reach the hard limit
                  of a total of 5000 types. The Zoombies contracts do not allow
                  anyone to edit or overwrite a card types definition once they
                  have been loaded.</p>
                  <p>New types released to the Shop will appear immediately. New types loaded in the boosters, will only be indicated by a type count increase, but are available to be randonly minted immediately.</p>
                  <h3>Shop card release countdown</h3>
                  <p>
                    When new types are released to the Shop, the minting button will display a countdown timer to the moment the card
                    will be unlocked for minting. Please note the timer you see on the screen may be off by a few seconds due to differences in your device load and memory.
                    We advise that you browse away and back to the Shop about 10 seconds before they release to re-sync your browser timing. The actual moment a card type is released for minting is determined by the smart contract, this website is giving you the best approximation of that moment.
                  </p>
                </div>
              </b-card-body>
            </b-collapse>
          </b-card>
          <b-card no-body class="mb-1">
            <b-card-header
              header-tag="header"
              class="accordion-header"
              role="tab"
            >
              <b-button v-b-toggle.accordion-6 block class="accordion-button">
                What is the difference between Unlimited and the Limited edition
                card types?
              </b-button>
            </b-card-header>
            <b-collapse
              id="accordion-6"
              accordion="my-accordion"
              role="tabpanel"
            >
              <b-card-body>
                <div class="card-body">
                  <ul>
                    <li>
                      An <strong>Unlimited edition</strong> NFT card type will
                      ONLY appear in the booster cards. These cards have an
                      edition number starting at #1 and count up infinitely.
                    </li>
                    <li>
                      A <strong>limited edition</strong> NFT card have a finite amount that will ever be
                      created. You will see the current edition number on the
                      NFT in a format like : #2 of 6. All Shop cards are limited edition.
                      <p>The boosters contain a number of limited edition cards, If you pull one of these, count yourself lucky !</p>
                    </li>
                  </ul>
                </div>
              </b-card-body>
            </b-collapse>
          </b-card>
          <b-card no-body class="mb-1">
            <b-card-header
              header-tag="header"
              class="accordion-header"
              role="tab"
            >
              <b-button v-b-toggle.accordion-7 block class="accordion-button">
                How can I get more
                <img
                  class="czxp-logo"
                  src="https://zoombies.world/images/zoombies_coin.svg"
                />
                ZOOM tokens ?
              </b-button>
            </b-card-header>
            <b-collapse
              id="accordion-7"
              accordion="my-accordion"
              role="tabpanel"
            >
              <b-card-body>
                <div class="card-body">
                  There are multiple ways in which you can get ZOOM
                  <img
                    class="czxp-logo"
                    src="https://zoombies.world/images/zoombies_coin.svg"
                  />
                  tokens:
                  <ul>
                    <li>
                      <span class="text-success"><strong>MOST PROFITABLE</strong></span> - Earn 20% of the amount earned by your affiliates
                      actions, resulting in passive earnings. Click the Affiliate link in the header
                      for more information.
                    </li>
                    <li>
                      <router-link to="/shop">
                        Buy Booster Credits
                      </router-link>
                      - +500 ZOOM per
                    </li>
                    <li>
                      <router-link to="/shop">
                        Mint a Limited edition Zoombies card from the Shop
                      </router-link>
                      - Check back of card for amount
                    </li>
                    <li>
                      <router-link to="/shop">
                        Mint a FREE Limited Edition Zoombies Card from the Shop
                      </router-link>
                      - Check back of card for amount
                    </li>
                    <li>
                      Buy and Open a Booster from Your
                      <router-link to="/my-zoombies-nfts">
                        NFT Crypt
                      </router-link>
                    </li>
                    <li>
                      <router-link to="/my-zoombies-nfts">
                        Sacrifice a Zoombies NFT card ( permanently )
                      </router-link>
                      - Check back of card for amount
                    </li>
                    <li>
                      Buy or exchange ZOOM on
                      <router-link to="/market">
                        supported Moonriver ERC-20 token exchanges
                      </router-link>
                    </li>
                    <li>Request tokens from other players</li>
                  </ul>
                </div>
              </b-card-body>
            </b-collapse>
          </b-card>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import {
  BCard,
  BCardHeader,
  BButton,
  BCollapse,
  BCardBody,
  BFormInput
} from "bootstrap-vue";
export default {
  name: "HelpContent",
  components: {
    BCard,
    BCardHeader,
    BButton,
    BCollapse,
    BCardBody,
    BFormInput
  },
  props: ["query"],
  data() {
    return {
      msg: "Here we go, here we go",
      wagerSample: 0,
    };
  },
  mounted() {
    //console.log('hello:',this.query);
    if (this.query !== "") {
      switch (this.query) {
        case "read-cards":
        // console.log('open tab 2');
        //this.accordion-1-5 = "visible";
      }
    }
  },
  methods: {
    addCZXPtoMetaMask: async function() {
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
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.czxp-logo {
  width: 4%;
  margin-right: 0.2em;
}

.accordion-header {
  padding: 0 !important;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.accordion-button {
  text-align: left;
  border-radius: 0;
  font-size: 1.25em;
}

.rarity-labels {
  color: white;
  padding: 2px 4px;
}

.mr-icon {
  height: 20px;
}

.rocket-fp-icon {
  max-height: 30px;
}
</style>
