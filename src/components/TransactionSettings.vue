<template>
  <div class="tx-settings">
    <p class="tx-settings__title">Transaction Settings</p>
    <div class="d-flex">
      <span class="mr-2">Slippage tolerance</span>
      <v-tooltip left content-class="tx-settings__tooltip">
        <template v-slot:activator="{ on, attrs }">
          <div class="tx-settings__slippage-hint" v-bind="attrs" v-on="on">
            ?
          </div>
        </template>
        <span>
          Your transaction will revert if the price changes unfavorably by more
          than this percentage.
        </span>
      </v-tooltip>
    </div>
    <div class="d-flex mt-2" style="height: 32px">
      <v-btn
        color="#2172e5"
        height="32px"
        rounded
        class="mr-2 tx-settings__slippage-autobtn"
        @click="slippageTolerance = ''"
      >
        Auto
      </v-btn>
      <v-text-field
        v-model="slippageTolerance"
        placeholder="0.10"
        outlined
        rounded
        height="32"
        hide-details
        reverse
        prefix="%"
        class="tx-settings__slippage-input"
        @change="onSlippageChanged"
      />
    </div>
    <div class="d-flex mt-2">
      <span class="mr-2">Transaction deadline</span>
      <v-tooltip left content-class="tx-settings__tooltip">
        <template v-slot:activator="{ on, attrs }">
          <div class="tx-settings__deadline-hint" v-bind="attrs" v-on="on">
            ?
          </div>
        </template>
        <span>
          Your transaction will revert if it is pending for more than this
          period of time.
        </span>
      </v-tooltip>
    </div>
    <div class="d-flex mt-2 tx-settings__deadline-body">
      <v-text-field
        class="tx-settings__deadline-input mr-3"
        v-model="transactionDeadline"
        placeholder="30"
        outlined
        rounded
        height="32"
        hide-details
        reverse
        @change="onDeadlineChanged"
      />
      <span>minutes</span>
    </div>
    <p class="tx-settings__title mt-3">Interface Settings</p>
    <div class="d-flex mt-2 justify-space-between">
      <div class="d-flex">
        <span class="mr-2">Auto Router</span>
        <v-tooltip left content-class="tx-settings__tooltip">
          <template v-slot:activator="{ on, attrs }">
            <div class="tx-settings__slippage-hint" v-bind="attrs" v-on="on">
              ?
            </div>
          </template>
          <span>
            Use the Uniswap Labs API to get better pricing through a more
            efficient route.
          </span>
        </v-tooltip>
      </div>
      <BToggler v-model="isAutoRouter" type="switcher" @input="onAutoRouterChanged" />
    </div>
    <div class="d-flex mt-2 justify-space-between align-center">
      <div class="d-flex">
        <span class="mr-2">Expert Mode</span>
        <v-tooltip left content-class="tx-settings__tooltip">
          <template v-slot:activator="{ on, attrs }">
            <div class="tx-settings__expertmode-hint" v-bind="attrs" v-on="on">
              ?
            </div>
          </template>
          <span>
            Allow high price impact trades and skip the confirm screen. Use at
            your own risk.
          </span>
        </v-tooltip>
      </div>
      <BToggler v-model="isExpertMode" type="switcher" @input="onExpertModeChanged" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Mixins } from "vue-property-decorator";
import BToggler from "@/components/common/BToggler.vue";
import MainMixin from "@/mixins/main";

@Component({ components: { BToggler } })
export default class TransactionSettings extends Mixins(MainMixin) {
  slippageTolerance = '';
  transactionDeadline = '';
  isAutoRouter = false;
  isExpertMode = false;

  onExpertModeChanged(value: boolean): void {
    this.store.settings.setSetting({ name: 'isExpertMode', value });
    this.store.settings.saveSettings();
  }

  onAutoRouterChanged(value: boolean): void {
    this.store.settings.setSetting({ name: 'isAutoRouter', value });
    this.store.settings.saveSettings();
  }

  onSlippageChanged(value: string): void {
    this.store.settings.setSetting({ name: 'slippageTolerance', value });
    this.store.settings.saveSettings();
  }

  onDeadlineChanged(value: string): void {
    this.store.settings.setSetting({ name: 'transactionDeadline', value });
    this.store.settings.saveSettings();
  }

  mounted(): void {
    this.store.settings.loadSettings()
    this.slippageTolerance = this.store.settings.settings.slippageTolerance;
    this.transactionDeadline = this.store.settings.settings.transactionDeadline;
    this.isAutoRouter = this.store.settings.settings.isAutoRouter;
    this.isExpertMode = this.store.settings.settings.isExpertMode;
  }
}
</script>

<style lang="scss">
.tx-settings {
  display: flex;
  flex-direction: column;
  width: 320px;
  height: auto;
  padding: 16px;
  background-color: $colorGrey1;
  box-shadow: rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px,
    rgb(0 0 0 / 4%) 0px 16px 24px, rgb(0 0 0 / 1%) 0px 24px 32px;
  border: 1px solid $colorGrey2;
  border-radius: 12px;
  color: $colorLightGrey1;
  font-size: 14px;

  &__title {
    font-weight: 600;
    margin-bottom: 12px !important;
  }

  &__slippage {
    &-input {
      fieldset {
        height: 38px;
      }

      .v-text-field__slot {
        height: 32px;
      }

      .v-input__slot {
        padding: 0 14px !important;
      }
    }

    &-autobtn {
      font-size: 16px !important;
      padding: 6px !important;
    }
  }

  &__deadline {
    &-input {
      flex: 0 1 90px !important;

      fieldset {
        height: 38px !important;
      }

      .v-text-field__slot {
        height: 32px !important;
      }

      .v-input__slot {
        padding: 0 14px !important;
      }
    }

    &-body {
      height: 32px;

      span {
        align-self: center;
        color: #fff;
      }
    }
  }

  // &__expertmode {
  //   &--active {
  //     background: #000;
  //   }
  // }

  &-tooltip {
    opacity: 1 !important;
    font-size: 16px !important;
    background: #2c2f36 !important;
    border: 1px solid $colorGrey2 !important;
    color: $colorLightGrey1 !important;
    border-radius: 8px !important;
    box-shadow: rgb(0 0 0 / 10%) 0px 4px 8px 0px !important;
    width: 256px !important;
    padding: 0.6rem 1rem !important;
    word-break: break-word !important;
  }
}
</style>
