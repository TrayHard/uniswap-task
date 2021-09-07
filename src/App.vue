<template>
  <div>
    <v-app>
      <v-main>
        <router-view />
        <div id="bg"></div>
      </v-main>
    </v-app>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'App',

  data: () => ({
    //
  })
})
</script>

<style lang="scss">
html {
  min-height: 100%;
  color: rgb(255, 255, 255);
  background-color: rgb(33, 36, 41);
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
}
</style>
