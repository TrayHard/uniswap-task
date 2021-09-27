<template>
  <div class="ts-manager-tokens">
    <v-text-field
      v-model="searchText"
      class="ts-manager-tokens__search"
      outlined
      rounded
      name="tokenname"
      placeholder="0x0000"
      hide-details
    />
    <section class="ts-manager-tokens__body">0 Custom Tokens</section>
    <section class="ts-manager-tokens__footer">
      Tip: Custom tokens are stored locally in your browser
    </section>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class TokenManagerTokens extends Vue {
  searchText = "";
}
</script>

<style lang="scss" scoped>
.ts-manager-tokens {
  display: grid;
  grid-template-rows: 100px auto 80px;
  height: 100%;

  &__search {
    font-size: 18px !important;
    border-radius: 20px !important;
    margin: 20px !important;
  }

  &__body {
    color: $colorLightGrey1;
    border-top: 1px solid $colorGrey1;
    padding: 20px;
    flex: 1 1 0;
  }

  &__footer {
    display: flex;
    align-items: center;
    padding: 20px;
    text-align: center;
    color: #8f96ac;
    border-top: 1px solid $colorGrey2;
  }
}
</style>
