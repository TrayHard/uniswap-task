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
        />
        <div class="coinchooser__common">
          <div class="coinchooser__common-title">
            Common bases <span class="coinchooser__common-hint">?</span>
          </div>
          <div class="coinchooser__common-content d-flex">
            <v-btn
              class="coinchooser__common-tokenbtn mr-2 mt-2"
              v-for="coin in basicCoins"
              :key="coin.ticker"
            >
              <img :src="coin.logo" width="24px" class="mr-2" />
              {{ coin.ticker }}
            </v-btn>
          </div>
        </div>
      </v-card-text>

      <v-virtual-scroll :items="fullCoinsList" height="700" item-height="56">
        <template v-slot:default="{ item: coin }">
          <v-list-item :key="coin.ticker">
            <v-list-item-avatar width="24px" height="24px" min-width="24px" class="ml-1 mr-4">
              <img :src="coin.logo">
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
        <v-icon small color="primary" class="mr-1">
          mdi-square-edit-outline
        </v-icon>
        Manage Token Lists
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { swapModule } from "@/store/swap";
import { COINS, ECoinsList } from "@/enums/enums";
import { getCoinLogo } from "@/utils";

type TFullCoinListItem = {
  ticker: string,
  logo: unknown,
  fullname: string,
}

@Component
export default class CoinChooser extends Vue {
  coinName = "";

  get isOpen(): boolean {
    return swapModule.state.isCoinChooserDialog;
  }

  set isOpen(value: boolean) {
    swapModule.updateState({ isCoinChooserDialog: value });
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
  }

  &__common {
    &-content {
      display: flex;
      flex-wrap: wrap;
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
  }
}
</style>
