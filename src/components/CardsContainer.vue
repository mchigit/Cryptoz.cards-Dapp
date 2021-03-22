<template>
  <div>
      <div class="wrapper">
        <div id="button-container">
          <div class="primary-actions">
            <SortDropdown
              :disabled="!ownsCards"
              @sort-by-attr="sortByAttr"
            ></SortDropdown>
            <b-button
              id="view-change-button"
              variant="info"
              @click="() => toggleTableView()"
              :disabled="!ownsCards"
            >
              {{ "View " + (isTableView ? "Gallery" : "Table") }}
            </b-button>
          </div>
          <div class="crypt-actions">
            <b-button
              class="my-crypt-button"
              variant="warning"
              @click="() => goBackToMyCrypt()"
              >Go To My Crypt</b-button
            >
            <b-input-group class="crypt-search-input-group">
              <b-form-input
                trim
                v-model="addressToSearch"
                type="text"
                placeholder="Wallet Address To Search"
                :state="addressToSearchState"
              ></b-form-input>
              <b-input-group-append>
                <b-button
                  @click="() => searchNewCrypt()"
                  :disabled="disableSearch"
                  variant="success"
                  >Search</b-button
                >
              </b-input-group-append>
            </b-input-group>
          </div>
        </div>
        <div class="loading" v-if="isLoading">
          <b-spinner style="width: 3rem; height: 3rem;" type="grow"></b-spinner>
        </div>
        <div v-else>
          <div v-if="ownsCards">
            <div v-if="!isTableView" class="cards-wrapper">
              <div
                v-for="card in orderedCards"
                :key="card.id"
                class="card-wrapper"
              >
                <OwnedCardContent
                  :id="card.id"
                  :type_id="card.type_id"
                  :name="card.name"
                  :cost="card.cost"
                  :cset="card.card_set"
                  :edition_current="card.edition_current"
                  :edition_total="card.edition_total"
                  :level="card.card_level"
                  :unlock_czxp="card.unlock_czxp"
                  :buy_czxp="card.buy_czxp"
                  :transfer_czxp="card.transfer_czxp"
                  :sacrifice_czxp="card.sacrifice_czxp"
                  :image="card.image"
                  :card_class="card.rarity"
                  :in_store="card.in_store"
                  :card_owned="true"
                ></OwnedCardContent>
              </div>
            </div>
            <div v-else>
              <b-table
                :items="orderedCards"
                :fields="tableFields"
                small
                striped
                responsive
              >
                <template #cell(name)="row">
                  <div class="cell card-name-cell">
                    <img
                      :src="row.item.image"
                      :class="`cell mr-4 ${row.item.rarity}`"
                    />
                    {{ row.item.name }}
                  </div>
                </template>
                <template #cell(card_level)="row">
                  <div class="cell">{{ row.item.card_level }}</div>
                </template>
                <template #cell(edition_number)="row">
                  <div class="cell">{{ row.item.edition_label }}</div>
                </template>
                <template #cell(unlock_czxp)="row">
                  <div class="cell">
                    {{ parseInt(row.item.unlock_czxp).toLocaleString() }}
                  </div>
                </template>
                <template #cell(sacrifice_czxp)="row">
                  <div class="cell">
                    {{ parseInt(row.item.sacrifice_czxp).toLocaleString() }}
                  </div>
                </template>
                <template #cell(transfer_czxp)="row">
                  <div class="cell">
                    {{ parseInt(row.item.transfer_czxp).toLocaleString() }}
                  </div>
                </template>
              </b-table>
            </div>
          </div>
          <div v-else>
            <h2>
              You do not own any Cryptoz<br /><router-link to="/shop"
                >To get Free Cryptoz NFTs or Buy one, visit the Minting
                Shop</router-link
              >
            </h2>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import Vue from "vue";
import { isAddress } from "../util/addressUtil";
import getCardTypes from "../util/getCardType";
import SortDropdown from "@/components/SortDropdown.vue";
import OwnedCardContent from "@/components/OwnedCardContent";
import { getRarity, dynamicSort } from "../helpers";

export default {
  name: "CardsContainer",
  components: {
    SortDropdown,
    OwnedCardContent,
  },
  props: {
    addressToLoad: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      isOthersCrypt: false,
      isLoading: false,
      orderedCards: [],
      ownsCards: false,
      sortType: null,
      isDescending: true,
      isTableView: false,
      tableFields: [
        "name",
        "card_level",
        "edition",
        "unlock_czxp",
        "sacrifice_czxp",
        "transfer_czxp",
      ],
      addressToSearch: null,
      disableSearch: true,
    };
  },
  mounted() {
    this.isLoading = true;
    this.getAllCards(this.addressToLoad);
  },
  computed: {
    coinbase() {
      console.log("coinbase: ", this.$store.state.web3.coinbase);
      return this.$store.state.web3.coinbase;
    },
    web3() {
      return this.$store.state.web3;
    },
    addressToSearchState() {
      return isAddress(this.addressToSearch);
    },
  },
  watch: {
    web3: {
      handler(val, oldVal) {
        
          if (val.isConnected) {
            this.getAllCards(this.addressToLoad);
          }
        
      },
      deep: true,
    },
    addressToSearch: function(newVal, oldVal) {
      const isSearchAddressValid = isAddress(newVal.toLowerCase());
      if (isSearchAddressValid) {
        this.disableSearch = false;
      } else {
        this.disableSearch = true;
      }
    },
  },
  methods: {
    addHashToLocation(params) {
      const currentPath = this.$route.path
      const newPath = currentPath.substring(0, currentPath.indexOf('crypt'))
      console.log(newPath)
      history.pushState(
        {},
        null,
        newPath + `${params}`
      )
  },
    clearCards: function() {
      this.orderedCards = [];
      this.ownsCards = false;
    },
    toggleTableView: function() {
      const nextVal = !this.isTableView;
      this.isTableView = nextVal;
    },
    searchNewCrypt: function() {
      this.isLoading = true;
      this.clearCards();
      this.addHashToLocation(`crypt/${this.addressToSearch}`)
      this.getAllCards(this.addressToSearch);
    },
    getAllCards: async function(addressToLoad) {
      this.isLoading = true;
      const instance = await window.Cryptoz.deployed();
      const tokensOfOwner = await instance.tokensOfOwner(addressToLoad);
      this.handleGetAllCards(tokensOfOwner, instance);
      this.isLoading = false;
    },
    handleGetAllCards: async function(tokensOfOwner, instance) {
      if (tokensOfOwner.length > 0) {
        this.ownsCards = true;

        //Place to track our token array data
        let tokenIdList = {};

        const getCard = async (tokenId) => {
          try {
            const ownedCard = await instance.getOwnedCard(tokenId);
            tokenIdList[tokenId] = ownedCard;
            const cardData = await getCardTypes(ownedCard[0].c[0]);

            cardData.id = tokenId;
            let newAttr = {};

            cardData.attributes.forEach((attribute) => {
              newAttr[attribute.trait_type] = attribute.value;
            });

            cardData.attributes = newAttr;
            cardData.attributes.edition_current = tokenIdList[tokenId][1].c[0];

            if (cardData.attributes.edition_total == 0) {
              //unlimited
              cardData.attributes.edition_label =
                "#" + cardData.attributes.edition_current;
            } else {
              cardData.attributes.edition_label =
                "#" +
                cardData.attributes.edition_current +
                " of " +
                cardData.attributes.edition_total;
            }

            switch (cardData.attributes.rarity) {
              case "Common":
                cardData.attributes.rarity = "card-bg card-bg-6";
                break;
              case "Uncommon":
                cardData.attributes.rarity = "card-bg card-bg-5";
                break;
              case "Rare":
                cardData.attributes.rarity = "card-bg card-bg-4";
                break;
              case "Epic":
                cardData.attributes.rarity = "card-bg card-bg-3";
                break;
              case "Diamond":
                cardData.attributes.rarity = "card-bg card-bg-2";
                break;
              case "Platinum":
                cardData.attributes.rarity = "card-bg card-bg-1";
                break;
            }

            newAttr = { ...newAttr, ...cardData };
            delete newAttr.attributes;

            return newAttr;
          } catch (error) {
            throw error;
          }
        };

        this.orderedCards = await Promise.all(
          tokensOfOwner.map((token) => getCard(token.c[0]))
        ).catch((err) => {
          console.error("Failed to fetch cards.", err);
          this.clearCards();
          return;
        });

        this.orderedCards.sort((a, b) => b.id - a.id);

        if (this.sortType) {
          this.sortByAttr(this.sortType, this.isDescending);
        }

        this.$store.dispatch("updateCardsOwned", this.orderedCards.length);
      } else {
        console.log("no cards returned from handleGetAllCards()");
        this.ownsCards = false;
      }
    },
    sortByAttr: function(param, isDescending) {
      this.sortType = param;
      this.isDescending = isDescending;

      switch (param) {
        case "edition_number":
          this.orderedCards.sort(
            dynamicSort("edition_current", isDescending, false)
          );
          break;
        case "rarity":
          this.orderedCards.sort(
            dynamicSort(param, isDescending, true, getRarity)
          );
          break;
        default:
          this.orderedCards.sort(dynamicSort(param, isDescending));
          break;
      }
    },
    goBackToMyCrypt: function() {
      this.$router.push("/crypt");
    },
  },
};
</script>

<style scoped>
#button-container {
  display: flex;
  margin-bottom: 2rem;
  flex-direction: column;
}

#view-change-button {
  margin-left: 0.5rem;
}

.loading {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 36px;
}

.cards-wrapper {
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

.wrapper {
  display: flex;
  flex-direction: column;
}

.crypt-actions {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.primary-actions {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
}

.my-crypt-button {
  width: 200px;
  margin-bottom: 16px;
}

.crypt-search-input-group {
  max-width: 500px;
}

.card-bg {
  padding: 2px;
}

.card-bg-6 {
  background-color: rgba(84, 81, 97, 0.5);
  border: 2px solid rgb(84, 81, 97);
}

.card-bg-5 {
  background-color: rgba(43, 164, 250, 0.5);
  border: 2px solid rgb(43, 164, 250);
}

.card-bg-4 {
  background-color: rgba(202, 60, 44, 0.5);
  border: 2px solid rgb(202, 60, 44);
}

.card-bg-3 {
  background-color: rgba(87, 69, 229, 0.5);
  border: 2px solid rgb(87, 69, 229);
}

table .cell {
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

/* Desktop CSS */
@media only screen and (min-width: 1000px) {
  #button-container {
    flex-direction: row;
    justify-content: space-between;
  }

  .crypt-actions {
    flex-direction: row;
    justify-content: initial;
    align-items: flex-start;
  }

  .my-crypt-button {
    width: 200px;
    margin-bottom: 0;
    margin-right: 16px;
  }
}
</style>
