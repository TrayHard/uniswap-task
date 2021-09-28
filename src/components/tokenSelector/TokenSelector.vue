<template>
  <v-dialog v-model="isOpen" width="420" content-class="tokenselector">
    <component :is="component" @changed="updateComponent" @close="isOpen = false" />
  </v-dialog>
</template>

<script lang="ts">
import { Component, Mixins, Watch } from "vue-property-decorator";
import MainMixin from "@/mixins/main";
import MainWindow from "./_Main.vue";
import TokensManager from "./tokenManager/TokenManager.vue";

export enum ETokenSelectorComponents {
  mainWindow = "mainWindow",
  tokenManager = "tokenManager",
}

@Component
export default class TokenSelector extends Mixins(MainMixin) {
  componentName = ETokenSelectorComponents.mainWindow

  get component(): unknown {
    return this.mapper[this.componentName];
  }

  mapper: Record<ETokenSelectorComponents, unknown> = {
    tokenManager: TokensManager,
    mainWindow: MainWindow,
  };

  get isOpen(): boolean {
    return this.store.tokenSelector.isModalOpen;
  }

  set isOpen(value: boolean) {
    this.store.tokenSelector.setIsModalOpen(value);
  }

  updateComponent(componentName: ETokenSelectorComponents): void {
    this.componentName = componentName;
  }

  @Watch('store.tokenSelector.isModalOpen')
  onModalOpenChange(value: boolean): void {
    if (value) this.componentName = ETokenSelectorComponents.mainWindow;
  }
}
</script>

<style lang="scss">
.tokenselector {
  position: relative;
  border-radius: 20px !important;
  border: 1px solid #212429;
  background: #191b1f;
  height: 80vh;
}
</style>
