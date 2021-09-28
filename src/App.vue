<template>
  <div>
    <div id="bg"></div>
    <v-app>
      <div class="nav">
        <a href="https://app.uniswap.org/">
          <img width="24px" src="@/assets/img/logo_white.svg" />
        </a>
        <v-btn-toggle x-small v-model="route" rounded dark class="nav__toggler">
          <v-btn x-small value="Swap">Swap</v-btn>
          <v-btn x-small value="Pool">Pool</v-btn>
          <v-btn x-small value="Vote">Vote</v-btn>
          <v-btn
            x-small
            value="Charts↗"
            href="https://info.uniswap.org/#/"
            target="_blank"
          >
            Charts <sup>↗</sup>
          </v-btn>
        </v-btn-toggle>
        <div class="nav__main">
          <template v-if="!isConnected">
            <v-btn color="#153d6f70" role="connect" class="px-3">
              Connect to a wallet
            </v-btn>
          </template>
          <template v-else>
            <div class="nav__main-info pl-3">
              <v-icon class="nav__main-loader mr-3" v-if="isBalanceLoading">
                mdi-autorenew
              </v-icon>
              <span class="mr-3" v-else-if="balance">{{ balance }} ETH</span>
              <div class="nav__main-address">
                <span class="mr-2">{{ shortenWalletAddress }}</span>
                <div
                  style="
                    overflow: hidden;
                    width: 16px;
                    height: 16px;
                    background-color: rgb(252, 25, 75);
                    border-radius: 8px;
                  "
                >
                  <img src="@/assets/img/addressIcon.svg" />
                </div>
              </div>
            </div>
          </template>
          <v-btn
            color="colorDarkBg"
            role="more"
            class="ml-3 px-2"
            height="36px"
            x-small
          >
            <img src="@/assets/img/ellipsis.svg" />
          </v-btn>
        </div>
      </div>
      <v-main>
        <router-view />
        <TokenSelector />
      </v-main>
    </v-app>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Watch } from "vue-property-decorator";
import TokenSelector from "@/components/tokenSelector/TokenSelector.vue";
import MainMixin from "./mixins/main";

@Component({ components: { TokenSelector } })
export default class App extends Mixins(MainMixin) {
  route = "Swap";

  isBalanceLoading = true;

  @Watch("route")
  onRouteChanged(newRoute: string): void {
    this.$router.push(newRoute.toLowerCase());
  }

  get isConnected(): boolean {
    return this.store.main.isConnected;
  }

  get shortenWalletAddress(): string | null {
    const address = this.store.main.address;
    return address ? `${address.slice(0, 6)}...${address.slice(-4)}` : null;
  }

  get balance(): number {
    return this.store.main.balances.ETH;
  }

  async created(): Promise<void> {
    await this.store.main.login();
    await this.store.main.getBalance("ETH");
    this.isBalanceLoading = false;
    this.store.settings.loadSettings();
    this.store.settings.saveSettings();
    await this.store.tokenSelector.getAllTokensLists();
  }
}
</script>

<style lang="scss">
@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}

.nav {
  background: #212429;
  display: grid;
  grid-template-columns: 120px 1fr 120px;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  flex-direction: row;
  width: 100%;
  top: 0px;
  padding: 1rem;
  position: relative;
  box-shadow: transparent 0px 0px 0px 1px;
  transition: background-position 0.1s ease 0s, box-shadow 0.1s ease 0s;
  background-blend-mode: hard-light;

  * {
    z-index: 10;
  }

  & &__toggler {
    -webkit-box-pack: start;
    justify-content: flex-start;
    justify-self: center;
    background-color: $colorDarkBg;
    width: fit-content;
    padding: 4px;
    border-radius: 16px;
    display: grid;
    grid-auto-flow: column;
    gap: 10px;
    overflow: auto;
    -webkit-box-align: center;
    align-items: center;

    button.v-btn,
    a.v-btn {
      background: #1e1e1e;
      border-radius: 13px;
      border: 0;
      font-size: 16px;
      height: 36px;

      &--active {
        background: rgb(44, 47, 54);
      }
    }
  }

  &__main {
    display: flex;
    flex-direction: row;
    -webkit-box-align: center;
    align-items: center;
    justify-self: flex-end;

    & > .v-btn {
      font-size: 16px;
      border-radius: 12px;

      &[role="connect"] {
        color: $colorLightBlue;
        border: 1px solid $colorDarkBlue;
      }

      &[role="more"] {
        color: #fff;
        border: 1px solid $colorDarkBg;
      }
    }

    &-info {
      display: flex;
      flex-direction: row;
      -webkit-box-align: center;
      align-items: center;
      background-color: #212429;
      border-radius: 12px;
      white-space: nowrap;
      width: 100%;
    }

    &-loader {
      animation: spinner 1s linear infinite;
    }

    &-address {
      display: flex;
      flex-flow: row nowrap;
      width: 100%;
      -webkit-box-align: center;
      align-items: center;
      padding: 0.5rem;
      border-radius: 12px;
      cursor: pointer;
      user-select: none;
      background-color: rgb(25, 27, 31);
      border: 1px solid rgb(33, 36, 41);
      color: rgb(255, 255, 255);
      font-weight: 500;
    }
  }
}

#bg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  pointer-events: none;
  width: 200vw;
  height: 200vh;
  background: radial-gradient(
    50% 50% at 50% 50%,
    #fc077d10 0,
    rgba(255, 255, 255, 0) 100%
  );
  transform: translate(-50vw, -100vh);
  z-index: 1;
}
</style>
