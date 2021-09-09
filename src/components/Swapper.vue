<template>
  <v-card width="480px" rounded="xl" class="swapper" color="colorDarkBg">
    <v-card-title primary-title class="swapper__header">
      <span class="swapper__header-title">Swap</span>
      <v-icon color="#bbb">mdi-cog-outline</v-icon>
    </v-card-title>

    <v-card-text>
      <div class="swapper__coins">
        <CoinField
          v-model="coindata[0].amount"
          :currency.sync="coindata[0].name"
        />
        <CoinField
          v-model="coindata[1].amount"
          :currency.sync="coindata[1].name"
        />
      </div>
    </v-card-text>

    <v-card-actions class="swapper__controls">
      <v-btn block x-large class="swapper__controls-connect">
        Connect Wallet
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CoinField from "@/components/CoinField.vue";

@Component({ components: { CoinField } })
export default class Home extends Vue {
  coindata = [
    {
      name: 'ETH',
      amount: null,
    },
    {
      name: undefined,
      amount: null,
    },
  ]
}
</script>

<style lang="scss">
.swapper {
  border-radius: 24px;

  &__header {
    display: flex;
    justify-content: space-between;

    &-title {
      font-size: 16px;
    }
  }

  &__controls-connect.v-btn.v-btn--has-bg {
    background: $colorDarkBlue;
    border-radius: 20px;
    color: $colorLightBlue;
  }

  &__coins {
    display: grid;
    grid-auto-flow: row;
    grid-gap: 4px;
  }

  .v-card__text {
    padding-left: 8px;
    padding-right: 8px;
  }
}
</style>