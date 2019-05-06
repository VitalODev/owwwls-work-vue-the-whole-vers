<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-flex xs12 sm11 md10 xl8>
        <div id="svg-caption" :style="{ width: computedStyle.widthCaption }">
          <h1 :style="{ fontSize: computedStyle.fontSizeH1 }">Front-End Web Development</h1>

          <Cook></Cook>

          <p :style="{ fontSize: computedStyle.fontSizeP }">Hello! My name is Vital, and, being the chief of this JavaScript kitchen, I'm glad to greet you. Having a wealth of experience developing in various languages and directions of programming, several years ago I became interested in full-stack JavaScript development. I aim to create high-quality, progressive single page applications. Turning ideas into reality with code, this is what I like to do. Also, I share my elaborations on the blog section during free time. Feel free to write to me in the contact tab if you are interested in anything.</p>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Cook from './animations/Cook'
export default {
  name: 'Home',
  props: ['computedStyle'],
  components: { Cook }
}
</script>

<style scoped>
  h1 {
    font-family: 'Baumans', cursive;
    margin: 20px auto;
  }

  #svg-caption {
    margin: 15px auto 12px;
  }
</style>
