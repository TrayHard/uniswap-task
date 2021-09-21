<template>
  <v-dialog v-model="isOpen" width="420" content-class="tokenchooser">
    <v-card color="#191b1f">
      <component :is="component" @changed="updateComponent"></component>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import MainMixin from "@/mixins/main";
import TokenListsManager from "./TokenListsManager.vue";
import TokensManager from "./TokensManager.vue";

export enum ETokenChooserComponents {
  tokens = "tokens",
  tokenLists = "tokenLists",
}

@Component({ components: { TokenListsManager, TokensManager } })
export default class TokenChooser extends Mixins(MainMixin) {
  componentName = "tokens" as ETokenChooserComponents;

  get component() {
    return this.mapper[this.componentName];
  }

  mapper: Record<ETokenChooserComponents, unknown> = {
    tokens: TokensManager,
    tokenLists: TokenListsManager,
  };

  get isOpen(): boolean {
    return this.store.tokenChooser.isModalOpen;
  }

  set isOpen(value: boolean) {
    this.store.tokenChooser.setIsModalOpen(value);
  }

  updateComponent(componentName: ETokenChooserComponents): void {
    console.log({ componentName });
    this.componentName = componentName;
  }
}
</script>

<style lang="scss">
.tokenchooser {
  border-radius: 20px !important;
  border: 1px solid #212429;
}
</style>
