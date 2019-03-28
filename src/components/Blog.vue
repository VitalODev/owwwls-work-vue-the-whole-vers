<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-flex sm12 md10 lg8 xl9>
          <h1 :style="{ fontSize: computedStyle.fontSizeH1 }">There are no postings on the blog... yet</h1>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Blog',
  props: [ 'computedStyle' ]
}
</script>
