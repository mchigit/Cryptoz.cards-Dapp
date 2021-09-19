<template>
  <div>
    <main role="main" class="container">
      <div class="jumbotron">
        <div v-if="load_state == -1" class="row">
          <div class="col">
            <h2>Loading....please wait</h2>
          </div>
        </div>
        <div v-else class="col content">
          <b-input-group class="search" @keyup.enter="searchToken">
            <b-form-input
              class="search-input"
              v-model="tokenToSearch"
              type="text"
              placeholder="Search for a Zoombies Token"
            />
            <b-input-group-append>
              <b-button
                variant="success"
                @click="searchToken"
              >
                Go
              </b-button>
            </b-input-group-append>
          </b-input-group>
          <div v-if="load_state == 0" class="row">
            <div class="col">
              <h2>Zoombies Token #{{ token_id }} does not exist on this chain</h2>
              <p>Please search for a valid token</p>
            </div>
          </div>
          <div v-else id="container" class="row">
            <div id="card-wrapper">
              <OwnedCardContent
                :id="card.id"
                :key="card.id"
                :type_id="card.attributes.type_id"
                :name="card.name"
                :cost="card.attributes.cost"
                :cset="card.attributes.card_set"
                :edition_current="edition_current"
                :edition_total="card.attributes.edition_total"
                :level="card.attributes.card_level"
                :unlock_czxp="card.attributes.unlock_czxp"
                :buy_czxp="card.attributes.buy_czxp"
                :sacrifice_czxp="card.attributes.sacrifice_czxp"
                :image="card.image"
                :card_class="card.attributes.rarity"
                :in_store="card.attributes.in_store"
                :card_owned="true"
                :is_single_card_view="true"
              />
            </div>
            <div id="stats-container" class="col">
              <div class="flex-row">
                <div class="text-right font-weight-bold label">Owner:</div>
                <div>
                  <a class="wrap-text" :href="owner_url">{{
                    owner
                  }}</a>
                </div>
              </div>
              <div class="flex-row">
                <div class="text-right font-weight-bold label">
                  Zoombies Token #:
                </div>
                <div class="">
                  {{ token_id }}
                </div>
              </div>
              <div class="flex-row">
                <div class="text-right font-weight-bold label">Editon:</div>
                <div class="">
                  {{ edition_current }}
                </div>
              </div>
              <div class="flex-row">
                <div class="text-right font-weight-bold label">Card Name:</div>
                <div class="">
                  {{ card.name }}
                </div>
              </div>
              <div class="flex-row">
                <div class="text-right font-weight-bold label">Card Set:</div>
                <div class="">
                  {{ card.attributes.card_set }}
                </div>
              </div>
              <div class="flex-row">
                <div class="text-right font-weight-bold label">
                  Type Released:
                </div>
                <div class="">
                  {{ released_date }}
                </div>
              </div>
              <div class="flex-row">
                <div class="text-right font-weight-bold label">Zombie Type:</div>
                <div class="">
                  {{ card.attributes.zombie_type }}
                </div>
              </div>
              <div class="flex-row">
                <div class="text-right font-weight-bold label">Rarity:</div>
                <div class="">
                  {{ rarity }}
                </div>
              </div>
              <div class="flex-row">
                <div class="text-right font-weight-bold label">Cost:</div>
                <div class="">
                  {{ card.attributes.cost }}
                </div>
              </div>
              <div class="flex-row">
                <div class="text-right font-weight-bold label">Earn ZOOM:</div>
                <div class="">
                  {{ card.attributes.buy_czxp }}
                </div>
              </div>
              <div class="flex-row">
                <div class="text-right font-weight-bold label">
                  Sacrifice ZOOM:
                </div>
                <div class="">
                  {{ card.attributes.sacrifice_czxp }}
                </div>
              </div>
              <div class="flex-row">
                <div class="text-right font-weight-bold label">Unlock ZOOM:</div>
                <div class="">
                  {{ card.attributes.unlock_czxp }}
                </div>
              </div>
              <div class="flex-row">
                <div class="text-right font-weight-bold label">Level:</div>
                <div class="">
                  {{ card.attributes.card_level }}
                </div>
              </div>
            </div>
          </div>
          <div class="description">
            {{ card.attributes.description }}
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import OwnedCardContent from "@/components/OwnedCardContent.vue";
import dAppStates from "@/dAppStates";
import {
  BButton,
  BInputGroup,
  BFormInput,
  BInputGroupAppend,
} from "bootstrap-vue";

export default {
  name: "TokenContent",
  components: {
    OwnedCardContent,
    BButton,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
  },
  data() {
    return {
      load_state: -1, //This is the loading state, -1 = loading state,0 - token doesn't exist, 1 = token is valid
      owner: "Loading..",
      token_id: "",
      card: {
        id: null,
        name: "Loading...",
        attributes: {
          rarity: "Loading...",
          edition_total: "Loading...",
          cost: "Loading...",
          card_set: "Loading...",
          zombie_type: "Loading...",
          buy_czxp: "Loading...",
          sacrifice_czxp: "Loading...",
          unlock_czxp: "Loading...",
          card_level: "Loading...",
          description: "Loading...",
        },
      },
      owner_url: "",
      rarity: "",
      released_date: "Loading..",
      edition_current: "Loading...",
      etherscan_token_id: "https://blockscout.moonriver.moonbeam.network/tokens/",
      tokenToSearch: "",
    };
  },
  computed: {
    CryptozInstance() {
      return this.$store.state.contractInstance.cryptoz;
    },
    isDAppConnected() {
      return (
        this.$store.state.dAppState === dAppStates.CONNECTED ||
        this.$store.state.dAppState === dAppStates.WALLET_CONNECTED
      );
    },
    coinbase() {
      return this.$store.state.web3.coinbase;
    },
  },
  watch: {
    isDAppConnected(value) {
      if (value) {
        this.loadCard(this.token_id);
      }
    },
    '$route.params.token_id': function (id) {
      this.token_id = parseInt(id)
      this.loadCard(this.token_id);
    }
  },
  mounted() {
    //grab the token id from the url
    this.token_id = parseInt(this.$route.params.token_id);
    if (this.isDAppConnected) {
      this.loadCard(this.token_id);
    }
  },
  methods: {
    loadCard: async function (token_id) {
      const res = await this.CryptozInstance.methods
        .nfts(token_id)
        .call()
        .catch((err) => console.log({ err }));

      //returns TypeId, Edition #
      let cardTypeId = parseInt(res[0]);

      //If the tokenId is greater than 0, we have something valid
      if (cardTypeId === 0) {
        this.load_state = 0;
        return;
      }

      this.edition_current = parseInt(res[1]);
      this.getCardData(cardTypeId);
      const owner = await this.CryptozInstance.methods.ownerOf(token_id).call();
      this.owner = owner;
      this.owner_url = this.getCryptLink(owner)
      const releaseTime = await this.CryptozInstance.methods.storeReleaseTime(cardTypeId).call();
      this.released_date = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(releaseTime*1000);
    },
    getCryptLink(owner) {
      const url =
        process.env.NODE_ENV == "development"
          ? "http://localhost:8080"
          : "https://movr.zoombies.world";
      return `${url}/my-zoombies-nfts/${owner}`;
    },
    getCardData: function (card_id) {
      axios
        .get(
          "https://zoombies.world/services/getCardData.php?card_id=" + card_id
        )
        .then(this.handleGotCardData);
    },
    handleGotCardData: function (res) {
      //console.log(res.data);

      var newAttr = [];
      //format the attributes to match our JS objects
      res.data.attributes.forEach(function (element) {
        newAttr[element.trait_type] = element.value;
      });

      //Overwrite our JSON reponse with vue friendly card binding data
      res.data.attributes = newAttr;

      //Get the human label for rarity
      this.rarity = res.data.attributes.rarity;

      //Append the bg
      switch (res.data.attributes.rarity) {
        case "Common":
          res.data.attributes.rarity = "card-bg card-bg-6";
          break;
        case "Uncommon":
          res.data.attributes.rarity = "card-bg card-bg-5";
          break;
        case "Rare":
          res.data.attributes.rarity = "card-bg card-bg-4";
          break;
        case "Epic":
          res.data.attributes.rarity = "card-bg card-bg-3";
          break;
        case "Diamond":
          res.data.attributes.rarity = "card-bg card-bg-2";
          break;
        case "Platinum":
          res.data.attributes.rarity = "card-bg card-bg-1";
          break;
      }

      if (res.data.attributes.edition_total === 0) {
        res.data.attributes.cost = "Booster";
      }

      this.card = res.data;
      this.card.id = this.token_id
      this.load_state = 1;
    },
    searchToken() {
      const tokenId = this.tokenToSearch.replace('#', '')
      this.$router.replace(tokenId)
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#container {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
}

#stats-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.flex-row {
  display: flex;
}

.flex-row > * {
  flex: 1;
  min-width: 0;
}

.wrap-text {
  word-wrap: break-word;
}

.centered {
  display: flex;
  align-items: center;
}

.label {
  max-width: 200px;
  margin-right: 10px;
}

#card-wrapper {
  display: flex;
  justify-content: center;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.search {
  width: 50%;
  min-width: 300px;
  margin-bottom: 20px;
}

.description {
  font-size: 18px;
  font-weight: 500;
  margin-top: 20px;
}
</style>
