<template>
  <v-dialog v-model="isOpen" width="500">
    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        Privacy Policy
      </v-card-title>

      <v-card-text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="dialog = false"> I accept </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { swapModule } from '@/store/swap';

@Component
export default class TokenChooser extends Vue {
  get isOpen(): boolean {
    return swapModule.state.isTokenChooserDialog;
  }

  set isOpen(value: boolean) {
    swapModule.updateState({ isTokenChooserDialog: value });
  }
}
</script>

<style lang="scss">
</style>
