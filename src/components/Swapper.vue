<template>
  <v-card width="480px" rounded="xl" class="swapper" color="colorDarkBg">
    <v-card-title primary-title class="swapper__header">
      <span class="swapper__header-title">Swap</span>
      <v-menu bottom :close-on-content-click="false" offset-y offset-x left>
        <template v-slot:activator="{ on, attrs }">
          <v-icon color="#bbb" v-bind="attrs" v-on="on">
            mdi-cog-outline
          </v-icon>
        </template>
        <TransactionSettings />
      </v-menu>
    </v-card-title>

    <v-card-text class="swapper__tokens">
      <div class="swapper__tokens-wrapper">
        <TokenField
          role="from"
          ref="tokenfield1"
          :amount.sync="tokenFieldsData[0].amount"
          :token.sync="tokenFieldsData[0].token"
          @tokenChanged="onTokenChanged(0, $event)"
          @amountChanged="onAmountChanged(0, $event)"
        />
        <TokenField
          role="to"
          ref="tokenfield2"
          :amount.sync="tokenFieldsData[1].amount"
          :token.sync="tokenFieldsData[1].token"
          @tokenChanged="onTokenChanged(1, $event)"
          @amountChanged="onAmountChanged(1, $event)"
        />
      </div>
      <div class="swapper__tokens-button" @click="swapTokens">
        <v-icon small>mdi-cached</v-icon>
      </div>
    </v-card-text>

    <v-card-text class="swapper__quote" v-if="tokensChosen && quote">
      <div class="d-flex justify-space-between align-center">
        <img src="@/assets/img/router.svg" width="16px" height="16px" />
        <div class="swapper__quote-info">{{ ratio }}</div>
      </div>
    </v-card-text>

    <v-card-actions class="swapper__controls">
      <v-btn
        v-if="!isConnected"
        block
        x-large
        class="swapper__controls-connect"
      >
        Connect Wallet
      </v-btn>
      <v-btn
        v-else-if="!readyToSwap"
        block
        x-large
        class="swapper__controls-hint"
        disabled
      >
        {{ hintText }}
      </v-btn>
      <v-btn
        v-else
        block
        x-large
        class="swapper__controls-ready"
        @click="doSwap"
      >
        Swap
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import TokenField from "@/components/TokenField.vue";
import TransactionSettings from "@/components/TransactionSettings.vue";
import { TToken } from "@/models/main";
import MainMixin from "@/mixins/main";

type TTokenFieldItem = {
  token?: TToken | null;
  amount: string | null;
};

@Component({ components: { TokenField, TransactionSettings } })
export default class Swapper extends Mixins(MainMixin) {
  $refs!: {
    tokenfield1: TokenField;
    tokenfield2: TokenField;
  };

  tokenFieldsData: TTokenFieldItem[] = [
    {
      token: null,
      amount: null,
    },
    {
      token: null,
      amount: null,
    },
  ];

  quote: null | number = null;

  get isConnected(): boolean {
    return this.store.main.isConnected;
  }

  get tokensChosen(): boolean {
    return !!this.tokenFieldsData[0].token && !!this.tokenFieldsData[1].token;
  }

  get readyToSwap(): boolean {
    return (
      !!this.tokenFieldsData[0].amount &&
      !!this.balance &&
      this.tokensChosen &&
      this.balance >= +this.tokenFieldsData[0].amount
    );
  }

  get balance(): number | null {
    if (
      this.tokenFieldsData[0].token &&
      this.tokenFieldsData[0].token.symbol in this.store.main.balances
    )
      return this.store.main.balances[this.tokenFieldsData[0].token?.symbol];
    else return null;
  }

  get ratio(): string {
    if (
      this.quote &&
      this.tokenFieldsData[0].token &&
      this.tokenFieldsData[1].token
    ) {
      const ratio = (1 / this.quote).toPrecision(6);
      return `1 ${this.tokenFieldsData[1].token.symbol} = ${ratio} ${this.tokenFieldsData[0].token.symbol}`;
    } else return "";
  }

  get hintText(): string {
    if (!this.tokenFieldsData[0].amount) return "Enter an amount";
    else if (!this.tokenFieldsData[0].token || !this.tokenFieldsData[1].token)
      return "Select a token";
    else if (typeof this.balance !== "number") return "Loading...";
    else if (+this.tokenFieldsData[0].amount > this.balance)
      return `Insufficient ${this.tokenFieldsData[0].token.symbol} balance`;
    else return "";
  }

  async updateBalance(): Promise<void> {
    if (this.tokenFieldsData[0].token)
      await this.store.main.getBalance(this.tokenFieldsData[0].token.symbol);
  }

  async updateQuote(): Promise<void> {
    if (this.tokenFieldsData[0].token && this.tokenFieldsData[1].token)
      this.quote = (
        await this.store.main.getQuote({
          from: this.tokenFieldsData[0].token.symbol,
          to: this.tokenFieldsData[1].token.symbol,
        })
      ).quote;
  }

  async loadTokensLists(): Promise<void> {
    await this.store.tokenSelector.getAllTokensLists();
  }

  async onTokenChanged(index: number, token: TToken | null): Promise<void> {
    this.$set(this.tokenFieldsData[index], "token", token);
    if (token) this.store.main.getBalance(token.symbol);
    if (!this.tokensChosen) this.quote = null;
    else {
      await this.updateQuote();
      this.onAmountChanged(1 - index, this.tokenFieldsData[1 - index].amount);
    }
  }

  onAmountChanged(index: number, amount: string | null): void {
    this.tokenFieldsData[index].amount = amount;
    if (this.tokensChosen && this.quote) {
      const newAmount =
        amount && +amount > 0
          ? (
              Math.floor(
                (index === 0 ? +amount * this.quote : +amount / this.quote) *
                  1000
              ) / 1000
            ).toString()
          : null;
      this.tokenFieldsData[1 - index].amount = newAmount;
      this.updateDelta();
    }
  }

  updateDelta(): void {
    if (
      this.$refs.tokenfield1.equivalent &&
      this.$refs.tokenfield2.equivalent
    ) {
      const eq1 = +this.$refs.tokenfield2.equivalent;
      const eq2 = +this.$refs.tokenfield1.equivalent;
      let delta = Math.floor((eq2 - eq1) * 10000) / 1000000;
      delta = delta < -100 ? -100 : delta;
      delta = delta > 100 ? 100 : delta;
      this.store.main.setDelta(delta);
    }
  }

  swapTokens(): void {
    this.tokenFieldsData.reverse();
    if (this.quote) this.quote = 1 / this.quote;
  }

  doSwap(): void {
    alert('An actual swappping is available only for tarif "Hired" ;)');
  }

  async mounted(): Promise<void> {
    this.$refs.tokenfield1.setLoadingState(true);
    await this.loadTokensLists();
    const ethToken = this.store.tokenSelector.basicTokensList.find(
      (e) => e.symbol === "ETH"
    );
    this.$set(this.tokenFieldsData[0], "token", ethToken);
    this.$set(this.tokenFieldsData[0], "amount", "");
    this.$refs.tokenfield1.setLoadingState(false);
    this.updateBalance();
  }
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

  &__tokens {
    position: relative;
    padding-bottom: 8px;

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

  &__quote {
    padding: 8px 12px !important;

    &-info {
      font-size: 14px;
    }
  }

  &__controls {
    &-hint.v-btn.v-btn--has-bg.v-btn--disabled {
      font-size: 20px !important;
      background-color: #2c2f36 !important;
      border-radius: 20px !important;
      .v-btn__content {
        color: $colorLightGrey1 !important;
      }
    }

    &-ready.v-btn.v-btn--has-bg {
      font-size: 20px !important;
      background-color: $colorBlue !important;
      border-radius: 20px !important;
      .v-btn__content {
        color: #fff !important;
      }
    }

    &-connect {
      background: $colorDarkBlue !important;
      border-radius: 20px !important;
      color: $colorLightBlue !important;
    }
  }

  .v-card__text {
    padding-left: 8px;
    padding-right: 8px;
  }
}
</style>
