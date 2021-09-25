<template>
  <v-card width="480px" rounded="xl" class="swapper" color="colorDarkBg">
    <v-card-title primary-title class="swapper__header">
      <span class="swapper__header-title">Swap</span>
      <v-icon color="#bbb"> mdi-cog-outline </v-icon>
    </v-card-title>

    <v-card-text>
      <div class="swapper__tokens">
        <div class="swapper__tokens-wrapper">
          <TokenField
            role="from"
            ref="tokenfield1"
            v-model="tokenFieldsData[0].amount"
            :token.sync="tokenFieldsData[0].token"
            @tokenChanged="onTokenChanged(0, $event)"
          />
          <TokenField
            role="to"
            v-model="tokenFieldsData[1].amount"
            :token.sync="tokenFieldsData[1].token"
            @tokenChanged="onTokenChanged(1, $event)"
          />
        </div>
        <div class="swapper__tokens-button" @click="tokenFieldsData.reverse()">
          <v-icon small>mdi-cached</v-icon>
        </div>
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
import { TToken } from "@/models/main";
import MainMixin from "@/mixins/main";

type TTokenFieldItem = {
  token?: TToken | null;
  amount: string | null;
};

@Component({ components: { TokenField } })
export default class Swapper extends Mixins(MainMixin) {
  $refs!: {
    tokenfield1: TokenField;
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

  get isConnected(): boolean {
    return this.store.main.isConnected;
  }

  get readyToSwap(): boolean {
    return (
      !!this.tokenFieldsData[0].amount &&
      !!this.balance &&
      !!this.tokenFieldsData[0].token &&
      !!this.tokenFieldsData[1].token &&
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

  async updateBalance(): Promise<void> {
    if (this.tokenFieldsData[0].token)
      await this.store.main.getBalance(this.tokenFieldsData[0].token.symbol);
  }

  get hintText(): string {
    if (!this.tokenFieldsData[0].amount) return "Enter an amount";
    else if (!this.tokenFieldsData[0].token || !this.tokenFieldsData[1].token)
      return "Select a token";
    else if (typeof this.balance !== "number") return "Loading...";
    else if (+(this.tokenFieldsData[0].amount) > this.balance)
      return `Insufficient ${this.tokenFieldsData[0].token.symbol} balance`;
    else return "";
  }

  async loadTokensLists(): Promise<void> {
    await this.store.tokenSelector.getAllTokensLists();
  }

  onTokenChanged(index: number, token: TToken): void {
    this.$set(this.tokenFieldsData[index], "token", token);
    this.store.main.getBalance(token.symbol)
  }

  doSwap() {
    console.log("DO SWAP");
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

  &__controls {
    &-hint.v-btn.v-btn--has-bg.v-btn--disabled {
      font-size: 20px !important;
      background-color: #2c2f36 !important;
      border-radius: 20px !important;
      .v-btn__content {
        color: #c3c5cb !important;
      }
    }

    &-ready.v-btn.v-btn--has-bg {
      font-size: 20px !important;
      background-color: #2172e5 !important;
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

  &__tokens {
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
