<template>
  <v-dialog v-model="isOpen" width="420" content-class="coinchooser">
    <v-card color="#191b1f">
      <v-card-title class="coinchooser__title">
        Select a token
        <v-icon @click="closeModal">mdi-close</v-icon>
      </v-card-title>

      <v-card-text class="coinchooser__body">
        <v-text-field
          v-model="coinName"
          class="coinchooser__search"
          outlined
          rounded
          name="coinname"
          placeholder="Search name or paste address"
          hide-details
        />
        <div class="coinchooser__common">
          <div class="coinchooser__common-title">
            Common bases
            <v-tooltip bottom content-class="coinchooser__common-tooltip">
              <template v-slot:activator="{ on, attrs }">
                <div class="coinchooser__common-hint" v-bind="attrs" v-on="on">
                  ?
                </div>
              </template>
              <span>These tokens are commonly paired with other tokens</span>
            </v-tooltip>
          </div>
          <div class="coinchooser__common-content d-flex">
            <v-btn
              class="coinchooser__common-tokenbtn mr-2 mt-2"
              v-for="coin in basicCoins"
              :key="coin.ticker"
              outlined
            >
              <v-avatar size="24px" class="mr-2">
                <img :src="coin.logo" width="24px" />
              </v-avatar>
              {{ coin.ticker }}
            </v-btn>
          </div>
        </div>
      </v-card-text>

      <v-virtual-scroll :items="fullCoinsList" height="700" item-height="56">
        <template v-slot:default="{ item: coin }">
          <v-list-item :key="coin.ticker" @click="getTokensList('aaveTokenList')">
            <v-list-item-avatar
              width="24px"
              height="24px"
              min-width="24px"
              class="ml-1 mr-4"
            >
              <img :src="coin.logo" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>
                {{ coin.ticker }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ coin.fullname }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-virtual-scroll>

      <v-card-actions class="coinchooser__footer">
        <div>
          <v-icon small color="primary" class="mr-1">
            mdi-square-edit-outline
          </v-icon>
          Manage Token Lists
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { tokenChooserStore } from "@/store/tokenChooserStore";
import { COINS, ECoinsList } from "@/enums/enums";
import { getCoinLogo } from "@/utils";

type TFullCoinListItem = {
  ticker: string;
  logo: unknown;
  fullname: string;
};

@Component
export default class CoinChooser extends Vue {
  coinName = "";

  get isOpen(): boolean {
    return tokenChooserStore.state.isModalOpen;
  }

  set isOpen(value: boolean) {
    tokenChooserStore.updateState({ isModalOpen: value });
  }

  getTokensList(name: string) {
    tokenChooserStore.actions.getTokensList(name)
  }

  closeModal(): void {
    this.isOpen = false;
  }

  get basicCoins(): { ticker: string; logo: unknown }[] {
    let coins = [];
    for (const ticker in COINS) {
      if (Object.prototype.hasOwnProperty.call(COINS, ticker)) {
        const coin = COINS[ticker as ECoinsList];
        coins.push({ ticker, logo: getCoinLogo(coin.logo) });
      }
    }
    return coins;
  }

  get fullCoinsList(): TFullCoinListItem[] {
    // TODO! Move coins list to store
    let coins = [];
    for (const ticker in COINS) {
      if (Object.prototype.hasOwnProperty.call(COINS, ticker)) {
        const coin = COINS[ticker as ECoinsList];
        coins.push({
          ticker,
          logo: getCoinLogo(coin.logo),
          fullname: coin.fullname,
        });
      }
    }
    return coins;
  }
}
</script>

<style lang="scss">
.coinchooser {
  border-radius: 20px !important;
  border: 1px solid #212429;

  &__title {
    display: flex;
    justify-content: space-between;
    font-size: 16px !important;
  }

  &__search {
    font-size: 18px !important;
    border-radius: 20px !important;
    margin-bottom: 16px !important;
  }

  &__common {
    &-title {
      color: #fff;
      font-size: 14px;
    }

    &-tooltip {
      opacity: 1 !important;
      font-size: 16px !important;
      background: #2c2f36 !important;
      border: 1px solid #40444f !important;
      color: #c3c5cb !important;
      border-radius: 8px !important;
      box-shadow: rgb(0 0 0 / 10%) 0px 4px 8px 0px !important;
      width: 256px !important;
      padding: 0.6rem 1rem !important;
      word-break: break-word !important;
    }

    &-hint {
      cursor: default;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 18px;
      height: 18px;
      font-size: 14px;
      border-radius: 50%;
      background: #2c2f36;
      color: #c3c5cb;

      &:hover {
        opacity: 0.7;
      }
    }

    &-content {
      display: flex;
      flex-wrap: wrap;
    }

    &-tokenbtn {
      border-radius: 10px !important;
      border: 1px solid #40444f !important;
      padding: 6px !important;
    }
  }

  .v-virtual-scroll {
    border-top: 1px solid #2c2f36;

    .v-list-item {
      &:hover {
        cursor: pointer;
        background: #2c2f36;
      }

      &__subtitle {
        font-size: 12px !important;
        // TODO: Fix font weight
      }
    }
  }

  &__footer {
    display: flex;
    justify-content: center;
    padding: 20px !important;
    background: #212429;
    color: var(--v-primary-base);
    border-top: 1px solid rgb(44, 47, 54);

    & > div:hover {
      cursor: pointer;
      opacity: 0.6;
    }
  }
}
</style>
