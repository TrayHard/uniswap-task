<template>
  <div class="container">
    <Swapper />
    <CoinChooser />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Swapper from '@/components/Swapper.vue';
import CoinChooser from '@/components/CoinChooser.vue';

@Component({ components: { Swapper, CoinChooser } })
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
