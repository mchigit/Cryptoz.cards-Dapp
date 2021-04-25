<template>
  <div class="jumbotron">
    <h2>The Heartbeat of the Universe</h2>
    <div class="grid">
      <b-card
        class="card-container"
        header="Rarity Distribution by Mintable Type"
        header-tag="header"
      >
        <b-tabs content-class="centered-container">
          <b-tab v-if="rarityDistribution.all" title="All Types" lazy>
            <div class="doughnut-container">
              <doughnut-chart :chart-data="rarityDistribution.all" />
            </div>
          </b-tab>
          <b-tab v-if="rarityDistribution.store" title="Store Types" lazy>
            <div class="doughnut-container">
              <doughnut-chart :chart-data="rarityDistribution.store" />
            </div>
          </b-tab>
          <b-tab v-if="rarityDistribution.boosters" title="Booster Types" lazy>
            <div class="doughnut-container">
              <doughnut-chart :chart-data="rarityDistribution.boosters" />
            </div>
          </b-tab>
        </b-tabs>
      </b-card>
      <b-card
        class="card-container"
        header="All NFTs minted by Rarity"
        header-tag="header"
      >
        <b-tabs  content-class="centered-container">
          <b-tab title="All NFTs" lazy>
            <div class="doughnut-container" v-if="nftsMintedByRarity" lazy>
              <doughnut-chart :chart-data="nftsMintedByRarity" />
            </div>
          </b-tab>
        </b-tabs>
      </b-card>
      <b-card
        class="card-container"
        header="Total NFTs Minted Over Time"
        header-tag="header"
      >
        <div class="line-container" v-if="nftsMintedOverTime.cumulative">
          <line-chart :chart-data="nftsMintedOverTime.cumulative" :options="options" />
        </div>
        <!--b-tabs>
          <b-tab title="NFTs minted total" lazy>
          </b-tab>
          <b-tab title="NFTs minted daily" lazy>
            <div class="line-container" v-if="nftsMintedOverTime.daily">
              <line-chart :chart-data="nftsMintedOverTime.daily" :options="lineOptions" />
            </div>
          </b-tab>
        </b-tabs-->
      </b-card>
    </div>
  </div>
</template>

<script>

const statsBaseUrl = 'https://cryptoz.cards/services/endpoints'

import {
  BCard,
  BCardText,
  BTabs,
  BTab
} from "bootstrap-vue";

import LineChart from './charts/LineChart'
import DoughnutChart from './charts/DoughnutChart'
import path from 'path'
import axios from 'axios'
import moment from 'moment'

const rarityNames = {
  1: 'Diamond',
  2: 'Platinum',
  3: 'Epic',
  4: 'Rare',
  5: 'Uncommon',
  6: 'Common',
}

const colors = [
  '#FFFFFF',
  '#D3D3D3',
  '#5745E5',
  '#CA3C2C',
  '#2BA4FA',
  '#545161',
]

export default {
  name: "DataIndicators",
  components: {
    BCard,
    BCardText,
    BTabs,
    BTab,
    LineChart,
    DoughnutChart,
  },
  data() {
    return {
      rarityDistribution: {
        all: null,
        store: null,
        boosters: null,
      },
      nftsMintedByRarity: null,
      nftsMintedOverTime: {
        cumulative: null
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    }
  },
  computed: {
    CryptozInstance() {
      return this.$store.state.contractInstance.cryptoz;
    },
  },
  mounted() {
    this.getRarityDistributions()
    this.getNFTsMintedOverTime()
    if (this.CryptozInstance) {
      this.getNFTsByRarity()
    }
  },
  methods: {
    async getNFTsByRarity() {
      const nftByRarity = await this.CryptozInstance.methods.getTokensByRarity().call();

      const labels = Object.values(rarityNames)
      const rarities = Object.values(nftByRarity).map((val) => parseInt(val))

      this.nftsMintedByRarity = {
        labels,
        datasets: [{
          label: '',
          data: rarities,
          backgroundColor: colors,
        }]
      }
    },
    async getRarityDistributions() {
      const rarityResult = await axios.get(`${statsBaseUrl}/type-rarity.json`)
      const { data } = rarityResult

      const labels = Object.values(rarityNames)

      this.rarityDistribution = {
        all: {
          labels,
          datasets: [{
            label: '',
            data: data.all.map(datum => parseInt(datum.count)),
            backgroundColor: colors,
          }]
        },
        store: {
          labels: labels.slice(2),
          datasets: [{
            label: '',
            data: data.store.map(datum => parseInt(datum.count)),
            backgroundColor: colors.slice(2),
          }]
        },
        boosters: {
          labels: labels.slice(2),
          datasets: [{
            label: '',
            data: data.booster.map(datum => parseInt(datum.count)),
            backgroundColor: colors.slice(2),
          }]
        },
      }
    },
    async getNFTsMintedOverTime() {
      const result = await axios.get(`${statsBaseUrl}/nfts-minted-over-time.json`)
      const { data } = result
      const labels = Object.keys(data).map(timestamp =>
        moment.unix(parseInt(timestamp)).format('MMM D, YYYY')
      )
      const cumulativeData = Object.values(data)
      // const dailyData = cumulativeData.map((val, i) => {
      //   if (i === 0) {
      //     return 0
      //   }
      //   return val - cumulativeData[i-1]
      // })

      this.nftsMintedOverTime = {
        cumulative: {
          labels,
          datasets: [
            {
              label: 'Total NFTs Minted',
              data: cumulativeData,
              borderColor: 'hsla(11, 100%, 50%, 1)',
              backgroundColor: 'hsla(11, 100%, 50%, 0.4)',
            },
          ],
        },
        // daily: {
        //   labels,
        //   datasets: [
        //     {
        //       label: 'Minted Daily',
        //       data: dailyData,
        //       borderColor: 'hsla(236, 100%, 50%, 1)',
        //       backgroundColor: 'hsla(236, 100%, 50%, 0.4)',
        //     },
        //   ]
        // }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(375px, 1fr));
  grid-gap: 20px;
  margin-top: 20px;
}

.card-container {
  margin-bottom: 10px;
}
.card-body {
  padding: 10px;

  .tabs {
    height: 100%;
  }

  .doughnut-container {
    max-width: 350px;
    position: relative;
  }

  .line-container {
    width: 100%;
    height: 450px;
    position: relative;
  }
}
</style>
