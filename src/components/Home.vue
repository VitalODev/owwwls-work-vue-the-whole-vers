<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-flex xs12 sm11 md10 xl8>
        <div id="svg-caption" :style="{ width: computedStyle.widthCaption }">
          <h1 :style="{ fontSize: computedStyle.fontSizeH1 }">The Front-End Kitchen</h1>

          <Cook></Cook>

          <h2>Welcome to the kitchen! Fresh JavaScript is being boiled here...</h2>

          <Player :computedStyle="computedStyle"></Player>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Cook from "./animations/Cook";
import Player from "./Player";
export default {
  name: "Home",
  props: ["computedStyle"],
  components: { Cook, Player }
};
</script>

<style scoped>
h1 {
  font-family: "Baumans", cursive;
  margin: 25px auto;
}

h2 {
  font-family: Quicksand, Roboto, Arial, sans-serif;
  font-size: 2em;
  font-weight: 400;
  margin: 30px auto;
  color: #546e7a;
}

#svg-caption {
  margin: 15px auto 12px;
}
</style>
