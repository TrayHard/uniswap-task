<template>
  <div>
    <v-text-field
      v-model="searchText"
      class="tokenselector__search"
      outlined
      rounded
      name="tokenname"
      placeholder="https:// or ipfs:// or ENS name"
      hide-details
    />
    <section class="token-lists">
      <v-virtual-scroll :items="tokenLists" height="700" item-height="84">
        <template v-slot:default="{ item: tokenList }">
          <ListItem
            :key="tokenList.name"
            :active.sync="tokenList.active"
            :list-name="tokenList.name"
            :tokens-count="tokenList.tokens.length"
            :list-logo="tokenList.logoURI"
            @change="setListActivity(tokenList.name, $event)"
          />
        </template>
      </v-virtual-scroll>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import MainMixin from "@/mixins/main";
import { TTokenList } from "@/models/main";
import ListItem from "./_ListItem.vue";

@Component({ components: { ListItem } })
export default class TokenManagerLists extends Mixins(MainMixin) {
  searchText = "";

  get tokenLists(): TTokenList[] {
    return this.store.tokenSelector.sortedTokensLists;
  }

  setListActivity(listname: string, value: boolean): void {
    this.store.tokenSelector.setListActivity({ listname, value });
  }
}
</script>

<style lang="scss" scoped>
.tokenselector__search {
  font-size: 18px !important;
  border-radius: 20px !important;
  margin: 20px !important;
}

.token-lists {
  border-top: 1px solid $colorGrey1;
  padding: 16px;
}
</style>
