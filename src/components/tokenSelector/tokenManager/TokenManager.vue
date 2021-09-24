<template>
  <div class="tokenmanager__wrapper">
    <v-card-title class="tokenmanager__title">
      <v-icon @click="back">mdi-arrow-left</v-icon>
      Manage
      <v-icon @click="closeModal">mdi-close</v-icon>
    </v-card-title>

    <v-card-text class="tokenmanager__body">
      <v-btn-toggle
        v-model="componentName"
        class="tokenmanager__toggler"
        mandatory
      >
        <v-btn value="lists">Lists</v-btn>
        <v-btn value="tokens">Tokens</v-btn>
      </v-btn-toggle>
    </v-card-text>

    <component :is="component" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Tokens from "./_Tokens.vue";
import Lists from "./_Lists.vue";
import { ETokenSelectorComponents } from "../TokenSelector.vue";

export enum ETokenManagerComponents {
  lists = "lists",
  tokens = "tokens",
}

@Component
export default class TokenListsManager extends Vue {
  componentName = ETokenManagerComponents.lists;

  get component(): unknown {
    const mapper: Record<ETokenManagerComponents, unknown> = {
      lists: Lists,
      tokens: Tokens,
    }
    return mapper[this.componentName];
  }

  closeModal(): void {
    this.$emit("close");
  }

  back(): void {
    this.$emit("changed", ETokenSelectorComponents.mainWindow);
  }
}
</script>

<style lang="scss">
.tokenmanager {
  &__wrapper {
    height: 100%;
    display: flex;
    flex-flow: column;
  }

  &__title {
    display: flex;
    justify-content: space-between;
    font-size: 20px !important;
    border-bottom: 1px solid $colorModalBorders;
  }

  &__body {
    padding-bottom: 0;

    .v-tabs {
      &-bar {
        background: unset !important;
      }

      &-items {
        background: unset !important;
        margin-top: 20px;
      }
    }
  }

  &__toggler {
    display: flex;
    justify-content: space-between;
    background: #40444f !important;
    margin-top: 20px;
    border-radius: 12px !important;
    padding: 6px !important;
    width: 100%;

    button.v-btn {
      width: 48%;
      padding: 10px !important;
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-pack: center;
      justify-content: center;
      border-radius: 12px !important;
      background-color: #40444f !important;
      border: 0 !important;
      color: #ffffff;
      font-size: 16px !important;

      &--active::before {
        background-color: #212429 !important;
        opacity: 1;
      }
    }
  }
}
</style>
