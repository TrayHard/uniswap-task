<template>
  <div class="coinfield"></div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { ECurrencyList } from "@/enums/enums";

@Component
export default class CoinField extends Vue {
  @Prop({ type: String, default: null })
  currency!: ECurrencyList;

  @Prop({ type: Number, default: 0 })
  amount!: number;

  @Prop({ type: Number, default: 0 })
  equivalent!: number;
}
</script>

<style lang="scss">
.coinfield {
  height: 85px;
  background: #212429;
  border: 1px solid #2c2f36;
  border-radius: 20px;

  &:hover,
  &:focus {
    border: 1px solid #40444f;
  }
}
</style>
