<template>
  <div
    class="token-list-item"
    :class="{ 'token-list-item--active': localIsActive }"
  >
    <v-avatar class="token-list-item__logo" size="40px" color="grey">
      <img v-if="listLogo" :src="listLogo" />
    </v-avatar>

    <div class="token-list-item__name">
      <p class="token-list-item__name-title">{{ listName }}</p>
      <p class="token-list-item__name-subtitle">
        {{ tokensCount }} tokens <v-icon x-small>mdi-cog</v-icon>
      </p>
    </div>

    <b-toggler v-model="localIsActive" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import BToggler from "@/components/common/BToggler.vue";

@Component({ components: { BToggler } })
export default class TokenListItem extends Vue {
  @Prop(String)
  listName!: string;

  @Prop(Number)
  tokensCount!: number;

  @Prop(String)
  listLogo!: string;

  @Prop({ type: Boolean, required: true })
  active!: boolean;

  localIsActive = false;

  @Watch("localIsActive")
  onIsActiveChange(newValue: boolean): void {
    this.$emit("change", newValue);
  }

  created(): void {
    this.localIsActive = this.active;
  }
}
</script>

<style lang="scss" scoped>
.token-list-item {
  display: flex;
  width: 100%;
  height: 72px;
  background: #2c2f36;
  border-radius: 20px;
  padding: 16px !important;

  &__logo {
    margin-right: 16px;
  }

  &__name {
    display: flex;
    flex-flow: column;
    justify-content: center;
    flex: 1 1 0;

    &-title {
      font-size: 16px;
    }
    &-subtitle {
      font-size: 12px;
    }
  }

  &--active {
    background: $colorBlue;
  }
}
</style>
