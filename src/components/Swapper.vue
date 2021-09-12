<template>
  <v-card width="480px" rounded="xl" class="swapper" color="colorDarkBg">
    <v-card-title primary-title class="swapper__header">
      <span class="swapper__header-title">Swap</span>
      <v-icon color="#bbb"> mdi-cog-outline </v-icon>
    </v-card-title>

    <v-card-text>
      <div class="swapper__coins">
        <div class="swapper__coins-wrapper">
          <CoinField
            v-model="coindata[0].amount"
            :currency.sync="coindata[0].name"
          />
          <CoinField
            v-model="coindata[1].amount"
            :currency.sync="coindata[1].name"
          />
        </div>
        <div class="swapper__coins-button" @click="coindata.reverse()">
          <v-icon small>mdi-cached</v-icon>
        </div>
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
      name: "ETH",
      amount: null,
    },
    {
      name: undefined,
      amount: null,
    },
  ];
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
    position: relative;

    &-wrapper {
      display: grid;
      grid-auto-flow: row;
      grid-gap: 4px;
    }

    &-button {
      display: flex;
      width: 32px;
      height: 32px;
      padding: 4px;
      border-radius: 12px;
      position: absolute;
      left: calc(50% - 16px);
      bottom: calc(50% - 16px);
      background-color: #212429;
      border: 4px solid #191b1f;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }

      .v-icon {
        transform: translateY(1px);
      }
    }
  }

  .v-card__text {
    padding-left: 8px;
    padding-right: 8px;
  }
}
</style>