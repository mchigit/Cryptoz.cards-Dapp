<template>
  <div>
    <main role="main" class="container">
      <!--
        brown       - 585858
        light blue  - 03c1e8
        red         - d5005a
        purple      - b92ee4
    -->
    <br/><br/><br/>
    <div>
   <b-jumbotron header="Community Feedback" lead="The core value of Zoombies is the Community">
    <p>NFT ownership is a revolutionary idea. Zoombies are fun little collectible cards right now, but you are part of a new era of digital ownership. Owning a peice of the Zoombies World NFT collection comes with a responsibility to have the vision and ambassador for something amazing.</p>
    <p>This is why, we are taking the first steps to create a process for decision making. Over time this process will evolve and we may end up with a Decentralized Autonomous Organization (DAO). Today we start with community feedback.</p>

    <h2>Open Feedback Forms</h2>
    <hr>


    <h4><a href="https://forms.gle/q2PQosoRyaPt3XAJ8" target="_blank">Zombify It!</a></h4>
    Closes Sept 17, 2021 18:00-UTC
    <br/><br/>

    <h4><a href="https://forms.gle/f5nQp5WwvDxW2uir7" target="_blank">Zoombies General Feature Suggestion</a></h4>
    Closes Sept 24, 2021 18:00-UTC
    <br/><br/>


    <h2>Closed forms</h2>
    <hr>

    <h4><a href="https://forms.gle/QecHTZzQ8xsQkpXQ7" target="_blank">ZOOM liquidity Provision Vote #1</a></h4>
    Closed Sept 6, 2021 21:53-UTC
    <br/><br/>

  </b-jumbotron>
</div>
      <h1></h1>

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
  BFormInput,
  BIcon,
  BJumbotron
} from "bootstrap-vue";
export default {
  name: "Feedback",
  components: {
    BCard,
    BCardHeader,
    BButton,
    BCollapse,
    BCardBody,
    BFormInput,
    BJumbotron,
    BIcon
  },
  props: ["query"],
  data() {
    return {
      msg: "Here we go, here we go",
      wagerSample: 0,
    };
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
h2 {
  margin-top:2em;
}
</style>
