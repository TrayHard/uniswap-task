<template>
  <div class="tokenfield">
    <div class="tokenfield__main">
      <div class="tokenfield__token-choose mr-3">
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
          color="colorBlue"
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
          v-mask="'#*.#*'"
          inputmode="decimal"
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
      <span class="tokenfield__under-equivalent" v-if="lAmount && equivalent">
        {{ equivalent | moneyFormat }}
        <span
          v-if="role === 'to'"
          :class="`tokenfield__under-equivalent--${deltaStyle}`"
        >
          ({{ delta }}%)
        </span>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Mixins,
  PropSync,
  Prop,
  Watch,
} from "vue-property-decorator";
import MainMixin from "@/mixins/main";
import { TToken } from "@/models/main";
import { moneyFormat } from "@/utils";
import mask from "@/plugins/directives/mask";

@Component({
  filters: { moneyFormat },
  directives: { mask },
})
export default class TokenField extends Mixins(MainMixin) {
  @PropSync("amount", { type: String, default: null })
  lAmount!: string | null;

  @PropSync("token", { type: Object })
  lToken?: TToken | null;

  @Prop(String)
  role!: "from" | "to";

  isLoading = false;

  usdQuote: null | number = null;

  watcherHandler(): void {}

  get equivalent(): number | null {
    return this.lAmount && this.usdQuote
      ? Math.floor(this.usdQuote * +this.lAmount * 100) / 100
      : null;
  }

  get currBalance(): number | null {
    if (this.lToken && this.store.main.balances[this.lToken.symbol])
      return this.store.main.balances[this.lToken.symbol];
    else return null;
  }

  get delta(): number | null {
    if (this.role === "to") return this.store.main.delta;
    else return null;
  }

  get deltaStyle(): string | null {
    if (this.delta) {
      switch (true) {
        case this.delta <= 0 && this.delta >= -1:
          return "neutral";
        case this.delta < -1 && this.delta >= -5:
          return "warning";
        case this.delta < -5:
          return "negative";
        case this.delta > 0:
          return "positive";
        default:
          return "";
      }
    } else return null;
  }

  openTokenSelector(): void {
    const token = this.lToken ? this.lToken : null;
    this.store.tokenSelector.setTokenChosen(token);
    this.store.tokenSelector.setIsModalOpen(true);
    this.watcherHandler = this.$watch(
      "store.tokenSelector.tokenChosen",
      (token: TToken | null) => {
        this.watcherHandler();
        this.$emit("tokenChanged", token);
        this.store.tokenSelector.setTokenChosen(null);
        this.store.tokenSelector.setIsModalOpen(false);
      }
    );
  }

  setLoadingState(value: boolean): void {
    this.isLoading = value;
  }

  onAmountChanged(e: InputEvent): void {
    const value = (e.target as HTMLInputElement).value;
    this.$emit("amountChanged", value);
  }

  @Watch("lToken")
  async onTokenChanged(newToken: TToken | null): Promise<void> {
    this.usdQuote = newToken
      ? (await this.store.main.getUsdQuote(newToken.symbol)).quote
      : null;
  }

  @Watch("currBalance")
  onCurrBalanceChanged(newValue: number | null): void {
    if (newValue === null && this.lToken) {
      this.store.main.getBalance(this.lToken.symbol);
    }
  }

  @Watch("store.tokenSelector.isModalOpen")
  onModalOpenChanged(isOpen: boolean): void {
    if (!isOpen) {
      this.store.tokenSelector.setTokenChosen(null);
      this.watcherHandler();
    }
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
    border: 1px solid $colorGrey2;
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
      &--neutral {
        color: #8f96ac;
      }

      &--warning {
        color: #e3a507;
      }

      &--negative {
        color: #ff4343;
      }

      &--positive {
        color: #27ae60;
      }

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
