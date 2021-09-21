<template>
  <div>
    <v-card-title class="tokenchooser__title">
      Manage
      <v-icon @click="closeModal">mdi-close</v-icon>
    </v-card-title>

    <v-card-text class="tokenchooser__body">
      text
    </v-card-text>

    <!-- <v-virtual-scroll :items="fullTokensList" height="700" item-height="56">
      <template v-slot:default="{ item: token }">
        <v-list-item-group v-model="tokenChosen">
          <v-list-item
            :key="token.symbol"
            :value="token"
            @click="setTokenChosen(token)"
          >
            <v-list-item-avatar
              v-if="token.logoURI"
              width="24px"
              height="24px"
              min-width="24px"
              class="ml-1 mr-4"
            >
              <img :src="token.logoURI" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>
                {{ token.symbol }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ token.name }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </template>
    </v-virtual-scroll> -->

    <v-card-actions class="tokenchooser__footer">
      actions
    </v-card-actions>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class TokenListsManager extends Vue {
  
}
</script>

<style lang="scss">

</style>
