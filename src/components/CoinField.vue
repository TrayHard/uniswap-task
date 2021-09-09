<template>
  <div class="coinfield">
    <div class="coinfield__main">
      <div class="coinfield__token-choose">
        <v-btn
          v-if="currency"
          rounded
          class="coinfield__currency px-2"
          color="colorDarkBg"
        >
          <img
            :src="currencyLogo"
            width="24px"
            class="mr-3"
          >
          {{ currency }}
          <v-icon class="ml-1">mdi-chevron-down</v-icon>
        </v-btn>
        <v-btn
          v-else
          color="#2172e5"
          rounded
          class="px-3"
        >
          Select a token
          <v-icon class="ml-1">mdi-chevron-down</v-icon>
        </v-btn>
      </div>
      <div class="coinfield__input">
        <input
          v-model="amount"
          type="text"
          inputmode="decimal"
          autocomplete="off"
          autocorrect="off"
          pattern="^[0-9]*[.,]?[0-9]*$"
          placeholder="0.0"
          minlength="1"
          maxlength="79"
          spellcheck="false"
        >
      </div>
    </div>
    <div class="coinfield__under">
      <span v-if="equivalent">{{ equivalent }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, ModelSync } from "vue-property-decorator";
import { CURRENCIES, ECurrencyList } from "@/enums/enums";

@Component
export default class CoinField extends Vue {
  @ModelSync("value", "input", { type: String, default: null })
  amount!: string | null;

  @Prop({ type: String, default: null })
  currency!: ECurrencyList;

  get currencyLogo(): unknown {
    return require(`../assets/img/coins/${CURRENCIES[this.currency].logo}`);
  }

  get equivalent(): string {
    return this.currency && this.amount
      ? (CURRENCIES[this.currency].equivalent * +this.amount).toString()
      : "";
  }
}
</script>

<style lang="scss">
.coinfield {
  height: 85px;
  background: #212429;
  border: 1px solid #2c2f36;
  border-radius: 20px;
  padding: 20px 16px 40px 16px;

  &:hover,
  &:focus {
    border: 1px solid #40444f;
  }

  .v-btn {
    font-size: 18px;
    letter-spacing: 0px;
  }

  &__main {
    display: flex;
    justify-content: space-between;
  }

  &__input {
    input {
      width: 100%;
      color: rgb(255, 255, 255);
      font-weight: 500;
      outline: none;
      border: none;
      font-size: 24px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 0px;
      text-align: right;
    }
  }

  &__under {
    display: flex;
    justify-content: flex-end;

    span {
      &::before {
        content: "~$ ";
      }

      &:hover {
        cursor: pointer;
        color: rgb(140, 144, 156);

        &::before {
          color: rgba(255, 255, 255, 0.7);
        }
      }
    }
  }
}
</style>
