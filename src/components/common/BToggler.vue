<template>
  <button :class="`b-toggler b-toggler__${type}`" @click="changeState">
    <template v-if="type == 'tumbler'">
      <span v-if="isOn" class="b-toggler__tumbler-label">ON</span>
      <div
        class="b-toggler__circle"
        :class="{ 'b-toggler__circle--active': isOn }"
      ></div>
      <span v-if="!isOn" class="b-toggler__tumbler-label">OFF</span>
    </template>
    <template v-else-if="type == 'switcher'">
      <span
        class="b-toggler__switcher-label-on d-flex align-center"
        :class="{ 'b-toggler__switcher-label-on--active': isOn }"
      >
        On
      </span>
      <span
        class="b-toggler__switcher-label-off d-flex align-center"
        :class="{ 'b-toggler__switcher-label-off--active': !isOn }"
      >
        Off
      </span>
    </template>
  </button>
</template>

<script lang="ts">
import { Vue, Component, VModel, Prop } from "vue-property-decorator";

@Component
export default class BToggler extends Vue {
  @VModel({ type: Boolean, default: false })
  isOn!: boolean;

  @Prop({ type: String, default: "tumbler" })
  type!: "tumbler" | "switcher";

  changeState(): void {
    this.isOn = !this.isOn;
  }
}
</script>

<style lang="scss">
.b-toggler {
  &__tumbler {
    border-radius: 20px;
    border: none;
    background: #212429;
    display: flex;
    width: fit-content;
    cursor: pointer;
    outline: none;
    padding: 0.4rem;
    -webkit-box-align: center;
    align-items: center;

    &-label {
      box-sizing: border-box;
      min-width: 0px;
      font-weight: 600;
      font-size: 14px;
      margin: 0px 6px;
      width: 28px;
    }
  }

  &__switcher {
    border-radius: 12px;
    border: none;
    background: $colorDarkBg;
    display: flex;
    width: fit-content;
    cursor: pointer;
    outline: none;
    padding: 2px;
    height: 30px;

    &-label-on {
      padding: 4px 9px;
      border-radius: 9px;
      background: none;
      color: #fff;
      font-size: 14px;
      font-weight: 400;
      height: 100%;

      &--active { background: #1966d4; }
    }

    &-label-off {
      padding: 4px 9px;
      border-radius: 9px;
      background: none;
      color: #fff;
      font-size: 14px;
      font-weight: 400;
      height: 100%;

      &--active { background: #565a69; }
    }
  }

  &__circle {
    border-radius: 50%;
    height: 24px;
    width: 24px;
    background-color: #565a69;

    &--active {
      background-color: $colorBlue;
    }
  }
}
</style>
