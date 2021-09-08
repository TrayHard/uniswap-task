<template>
  <div class="container">
    <v-card width="480px" class="swapper" color="colorDarkBg">
      <v-card-title primary-title> title </v-card-title>
      <v-card-text> <span>TEST </span></v-card-text>
      <v-card-actions>
        <v-btn outlined rounded text> Button </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Home extends Vue {}
</script>

<style lang="scss">
.container {
  display: flex;
  justify-content: center;
  padding-top: 75px;

  * { z-index: 10; }
}
</style>