<template>
  <div class="container">
    <Swapper />
    <TokenChooser />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Swapper from '@/components/Swapper.vue';
import TokenChooser from '@/components/TokenChooser.vue';

@Component({ components: { Swapper, TokenChooser } })
export default class SwapPage extends Vue {}
</script>

<style lang="scss">
.container {
  display: flex;
  justify-content: center;
  padding-top: 75px;

  * {
    z-index: 10;
  }
}
</style>
