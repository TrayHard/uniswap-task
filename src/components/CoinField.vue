<template>
  <div class="coinfield">
    <div class="coinfield__main">
      <div class="coinfield__coin-choose">
        <v-btn
          v-if="coin"
          rounded
          class="coinfield__coin px-2"
          color="colorDarkBg"
          @click="openCoinChooser"
        >
          <img
            :src="coinLogo"
            width="24px"
            class="mr-3"
          >
          {{ coin }}
          <v-icon class="ml-1">mdi-chevron-down</v-icon>
        </v-btn>
        <v-btn
          v-else
          color="#2172e5"
          rounded
          class="px-3"
          @click="openCoinChooser"
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
import { COINS, ECoinsList } from "@/enums/enums";
import { swapModule } from "@/store/swap";
import { getCoinLogo } from '@/utils';

@Component
export default class CoinField extends Vue {
  @ModelSync("value", "input", { type: String, default: null })
  amount!: string | null;

  @Prop({ type: String, default: null })
  coin!: ECoinsList;

  get coinLogo(): unknown {
    return getCoinLogo(COINS[this.coin].logo);
  }

  get equivalent(): string {
    return this.coin && this.amount
      ? (COINS[this.coin].equivalent * +this.amount).toString()
      : "";
  }

  openCoinChooser(): void {
    swapModule.updateState({ isCoinChooserDialog: true });
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
