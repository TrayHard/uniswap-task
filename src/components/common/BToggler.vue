<template>
  <button class="b-toggler" @click="changeState">
    <span v-if="isActive" class="b-toggler__label">ON</span>
    <div
      class="b-toggler__circle"
      :class="{ 'b-toggler__circle--active': isActive }"
    ></div>
    <span v-if="!isActive" class="b-toggler__label">OFF</span>
  </button>
</template>

<script lang="ts">
import { Vue, Component, VModel } from 'vue-property-decorator';

@Component
export default class BToggler extends Vue {
  @VModel({ type: Boolean, default: false })
  isActive!: boolean

  istrue = false

  changeState(): void {
    this.isActive = !this.isActive
    console.log(this.isActive);
  }
}
</script>

<style lang="scss">
.b-toggler {
  border-radius: 20px;
  border: none;
  background: rgb(33, 36, 41);
  display: flex;
  width: fit-content;
  cursor: pointer;
  outline: none;
  padding: 0.4rem;
  -webkit-box-align: center;
  align-items: center;

  &__circle {
    border-radius: 50%;
    height: 24px;
    width: 24px;
    background-color: #565a69;

    &--active {
      background-color: #2172e5;
    }
  }

  &__label {
    box-sizing: border-box;
    min-width: 0px;
    font-weight: 600;
    font-size: 14px;
    margin: 0px 6px;
    width: 28px;
  }
}
</style>
