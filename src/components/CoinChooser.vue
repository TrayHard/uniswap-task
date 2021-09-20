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
          <v-btn-toggle mandatory v-model="coinChosen" class="coinchooser__common-content d-flex">
            <v-btn
              class="coinchooser__common-tokenbtn mr-2 mt-2"
              v-for="coin in basicCoins"
              :key="coin.symbol"
              outlined
            >
              <v-avatar size="24px" class="mr-2">
                <img :src="coin.logoURI" width="24px" />
              </v-avatar>
              {{ coin.symbol }}
            </v-btn>
          </v-btn-toggle>
        </div>
      </v-card-text>

      <v-virtual-scroll :items="fullCoinsList" height="700" item-height="56">
        <template v-slot:default="{ item: coin }">
          <v-list-item-group v-model="coinChosen">
            <v-list-item
              :key="coin.symbol"
              :value="coin"
              @click="setTokenChosen(coin)"
            >
              <v-list-item-avatar
                v-if="coin.logoURI"
                width="24px"
                height="24px"
                min-width="24px"
                class="ml-1 mr-4"
              >
                <img :src="coin.logoURI" />
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>
                  {{ coin.symbol }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ coin.name }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
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
import { Component, Watch, Mixins } from "vue-property-decorator";
import { TToken } from "@/models/main";
import MainMixin from "@/mixins/main";

@Component
export default class CoinChooser extends Mixins(MainMixin) {
  coinName = "";
  coinChosen = "";

  get isOpen(): boolean {
    return this.store.tokenChooser.isModalOpen;
  }

  set isOpen(value: boolean) {
    this.store.tokenChooser.setIsModalOpen(value);
  }

  getTokensList(name: string): void {
    this.store.tokenChooser.getTokensList(name);
  }

  setTokenChosen(token: TToken): void {
    this.store.tokenChooser.setTokenChosen(token);
  }

  closeModal(): void {
    this.isOpen = false;
  }

  get basicCoins(): TToken[] {
    return this.store.tokenChooser.basicTokensList
  }

  get fullCoinsList(): TToken[] {
    return this.store.tokenChooser.fullTokensList
  }

  @Watch("coinChosen")
  onCoinChosenChange(newVal: any) {
    console.log({ newVal });
  }

  mounted(): void {
    this.store.tokenChooser.getTokensList('arbitrumOne')
    this.store.tokenChooser.getTokensList('optimism')
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
      background: #191b1f !important;
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
