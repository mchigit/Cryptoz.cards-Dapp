<template>
  <b-modal
    id="transaction-modal"
    v-model="isTransactionPending"
    title="Confirm Transaction"
    hide-footer
    centered
    no-close-on-backdrop
  >
    <span id="spinner-container">
      <img src="./assets/zoombies_head.svg" />
      <b-spinner id="spinnyboi" />
    </span>
    <span>Please confirm the transaction.</span>
  </b-modal>
</template>

<script>
export default {
  name: "TransactionModal",
  computed: {
    isTransactionPending: {
      get: function () {
        return this.$store.state.isTransactionPending;
      },
      set: function (value) {
        this.$store.dispatch("setIsTransactionPending", value);
      },
    },
  },
};
</script>

<style scoped lang="scss">
.modal-body {
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 50px 0;
}

#spinner-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;

  img {
    position: absolute;
    width: 85px;
    height: 85px;
  }
  #spinnyboi {
    width: 100px;
    height: 100px;
    background: transparent;
  }
}
</style>
