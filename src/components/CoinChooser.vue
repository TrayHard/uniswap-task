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
              :key="coin.name"
            >
              <img :src="coin.logo" width="24px" class="mr-2" />
              {{ coin.name }}
            </v-btn>
          </div>
        </div>
      </v-card-text>

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

  get basicCoins(): { name: string; logo: unknown }[] {
    let coins = [];
    for (const coinName in COINS) {
      if (Object.prototype.hasOwnProperty.call(COINS, coinName)) {
        const coin = COINS[coinName as ECoinsList];
        coins.push({ name: coinName, logo: getCoinLogo(coin.logo) });
      }
    }
    return coins;
  }
}
</script>

<style lang="scss">
.coinchooser {
  border-radius: 20px !important;

  &__title {
    display: flex;
    justify-content: space-between;
    font-size: 16px !important;
  }

  &__common {
    &-content {
      display: flex;
      flex-wrap: wrap;
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
