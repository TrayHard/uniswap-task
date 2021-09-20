<template>
  <v-dialog v-model="isOpen" width="420" content-class="tokenchooser">
    <v-card color="#191b1f">
      <v-card-title class="tokenchooser__title">
        Select a token
        <v-icon @click="closeModal">mdi-close</v-icon>
      </v-card-title>

      <v-card-text class="tokenchooser__body">
        <v-text-field
          v-model="tokenName"
          class="tokenchooser__search"
          outlined
          rounded
          name="tokenname"
          placeholder="Search name or paste address"
          hide-details
        />
        <div class="tokenchooser__common">
          <div class="tokenchooser__common-title">
            Common bases
            <v-tooltip bottom content-class="tokenchooser__common-tooltip">
              <template v-slot:activator="{ on, attrs }">
                <div class="tokenchooser__common-hint" v-bind="attrs" v-on="on">
                  ?
                </div>
              </template>
              <span>These tokens are commonly paired with other tokens</span>
            </v-tooltip>
          </div>
          <v-btn-toggle mandatory v-model="tokenChosen" class="tokenchooser__common-content d-flex">
            <v-btn
              class="tokenchooser__common-tokenbtn mr-2 mt-2"
              v-for="token in basicTokens"
              :key="token.symbol"
              outlined
              @click="setTokenChosen(token)"
            >
              <v-avatar size="24px" class="mr-2">
                <img :src="token.logoURI" width="24px" />
              </v-avatar>
              {{ token.symbol }}
            </v-btn>
          </v-btn-toggle>
        </div>
      </v-card-text>

      <v-virtual-scroll :items="fullTokensList" height="700" item-height="56">
        <template v-slot:default="{ item: token }">
          <v-list-item-group v-model="tokenChosen">
            <v-list-item
              :key="token.symbol"
              :value="token"
              @click="setTokenChosen(token)"
            >
              <v-list-item-avatar
                v-if="token.logoURI"
                width="24px"
                height="24px"
                min-width="24px"
                class="ml-1 mr-4"
              >
                <img :src="token.logoURI" />
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>
                  {{ token.symbol }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ token.name }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </template>
      </v-virtual-scroll>

      <v-card-actions class="tokenchooser__footer">
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
export default class TokenChooser extends Mixins(MainMixin) {
  tokenName = "";
  tokenChosen = "";

  get isOpen(): boolean {
    return this.store.tokenChooser.isModalOpen;
  }

  set isOpen(value: boolean) {
    this.store.tokenChooser.setIsModalOpen(value);
  }

  get basicTokens(): TToken[] {
    return this.store.tokenChooser.basicTokensList
  }

  get fullTokensList(): TToken[] {
    return this.store.tokenChooser.fullTokensList
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

  @Watch("store.tokenChooser.tokenChosen")
  onTokenChosen(): void {
    this.closeModal()
  }

  mounted(): void {
    this.store.tokenChooser.getTokensList('arbitrumOne')
    this.store.tokenChooser.getTokensList('optimism')
  }
}
</script>

<style lang="scss">
.tokenchooser {
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
