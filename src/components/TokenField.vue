<template>
  <div class="tokenfield">
    <div class="tokenfield__main">
      <div class="tokenfield__token-choose">
        <v-btn
          v-if="isLoading"
          rounded
          :loading="isLoading"
          color="colorDarkBg"
          width="115px"
        >
          <v-icon>mdi-load</v-icon>
        </v-btn>
        <v-btn
          v-else-if="lToken"
          rounded
          class="tokenfield__token px-2"
          color="colorDarkBg"
          @click="openTokenSelector"
        >
          <v-avatar size="24px" class="mr-2">
            <img :src="lToken.logoURI" width="24px" />
          </v-avatar>
          {{ lToken.symbol }}
          <v-icon class="ml-1">mdi-chevron-down</v-icon>
        </v-btn>
        <v-btn
          v-else
          color="#2172e5"
          rounded
          class="px-3"
          @click="openTokenSelector"
        >
          Select a token
          <v-icon class="ml-1">mdi-chevron-down</v-icon>
        </v-btn>
      </div>
      <div class="tokenfield__input">
        <input
          :value="lAmount"
          type="text"
          inputmode="decimal"
          autocomplete="off"
          autocorrect="off"
          pattern="^[0-9]*[.,]?[0-9]*$"
          placeholder="0.0"
          minlength="1"
          maxlength="79"
          spellcheck="false"
          @input="onAmountChanged"
        />
      </div>
    </div>
    <div class="tokenfield__under">
      <span class="tokenfield__under-balance" v-if="currBalance">
        Balance: {{ currBalance }} {{ this.lToken.symbol }}
      </span>
      <v-spacer />
      <span class="tokenfield__under-equivalent" v-if="lAmount">{{
        equivalent
      }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component,
  ModelSync,
  Mixins,
  PropSync,
  Prop,
  Watch,
} from "vue-property-decorator";
import MainMixin from "@/mixins/main";
import { TToken } from "@/models/main";

@Component
export default class TokenField extends Mixins(MainMixin) {
  @PropSync("amount", { type: String, default: null })
  lAmount!: string | null;

  @PropSync("token", { type: Object })
  lToken?: TToken | null;

  @Prop(String)
  role!: "from" | "to";

  isLoading = false;

  usdQuote: null | number = null;

  get equivalent(): string {
    return this.lAmount && this.usdQuote
      ? (this.usdQuote * +this.lAmount).toPrecision(7).toString()
      : "";
  }

  get currBalance(): number | null {
    if (this.lToken && this.store.main.balances[this.lToken.symbol])
      return this.store.main.balances[this.lToken.symbol];
    else return null;
  }

  openTokenSelector(): void {
    this.store.tokenSelector.setIsModalOpen(true);
    const unwatch = this.$watch(
      "store.tokenSelector.tokenChosen",
      (token: TToken) => {
        this.store.tokenSelector.setIsModalOpen(false);
        this.$emit("tokenChanged", token);
        this.store.tokenSelector.setTokenChosen(null);
        unwatch();
      }
    );
  }

  setLoadingState(value: boolean): void {
    this.isLoading = value;
  }

  @Watch("lToken")
  async onTokenChanged(newToken: TToken | null): Promise<void> {
    this.usdQuote = newToken
      ? (await this.store.main.getUsdQuote(newToken.symbol)).quote
      : null;
  }

  onAmountChanged(e: InputEvent): void {
    this.$emit("amountChanged", (e.target as HTMLInputElement).value);
  }
}
</script>

<style lang="scss">
.tokenfield {
  height: auto;
  background: #212429;
  border: 1px solid #2c2f36;
  border-radius: 20px;
  padding: 20px 16px;

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
    margin-top: 12px;

    &-equivalent {
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
