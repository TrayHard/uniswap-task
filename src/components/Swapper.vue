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
            ref="tokenfield1"
            v-model="tokenFieldsData[0].amount"
            :token.sync="tokenFieldsData[0].token"
            @tokenChanged="onTokenChanged(0, $event)"
          />
          <TokenField
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
      <v-btn block x-large class="swapper__controls-connect">
        Connect Wallet
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
export default class Home extends Mixins(MainMixin) {
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

  async loadTokensLists(): Promise<void> {
    await this.store.tokenSelector.getAllTokensLists();
  }

  onTokenChanged(index: number, token: TToken): void {
    this.$set(this.tokenFieldsData[index], "token", token);
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

  &__controls-connect.v-btn.v-btn--has-bg {
    background: $colorDarkBlue;
    border-radius: 20px;
    color: $colorLightBlue;
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