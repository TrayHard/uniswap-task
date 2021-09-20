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
          @click="openTokenChooser"
        >
          <v-avatar size="24px" class="mr-2">
            <img
              :src="lToken.logoURI"
              width="24px"
            >
          </v-avatar>
          {{ lToken.symbol }}
          <v-icon class="ml-1">mdi-chevron-down</v-icon>
        </v-btn>
        <v-btn
          v-else
          color="#2172e5"
          rounded
          class="px-3"
          @click="openTokenChooser"
        >
          Select a token
          <v-icon class="ml-1">mdi-chevron-down</v-icon>
        </v-btn>
      </div>
      <div class="tokenfield__input">
        <input
          v-model="amount"
          type="text"
          inputmode="decimal"
          autocomplete="off"
          autocorrect="off"
          pattern="^[0-9]*[.,]?[0-9]*$"
          placeholder="0.0"
          minlength="1"
          maxlength="79"
          spellcheck="false"
        >
      </div>
    </div>
    <div class="tokenfield__under">
      <span v-if="equivalent">{{ equivalent }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, ModelSync, Mixins, PropSync } from "vue-property-decorator";
import MainMixin from '@/mixins/main';
import { TToken } from "@/models/main";

@Component
export default class TokenField extends Mixins(MainMixin) {
  @ModelSync("value", "input", { type: String, default: null })
  amount!: string | null;

  @PropSync('token', { type: Object })
  lToken?: TToken | null;

  isLoading = false

  get equivalent(): string {
    return ''
    // return this.token && this.amount
    //   ? (COINS[this.token].equivalent * +this.amount).toString()
    //   : "";
  }

  openTokenChooser(): void {
    this.store.tokenChooser.setIsModalOpen(true);
    const unwatch = this.$watch('store.tokenChooser.tokenChosen', (token: TToken) => {
      console.log('watcher');
      this.$emit('tokenChanged', token)
      unwatch()
    })
  }

  setLoadingState(value: boolean): void {
    this.isLoading = value
  }
}
</script>

<style lang="scss">
.tokenfield {
  height: 85px;
  background: #212429;
  border: 1px solid #2c2f36;
  border-radius: 20px;
  padding: 20px 16px 40px 16px;

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
    justify-content: flex-end;

    span {
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
