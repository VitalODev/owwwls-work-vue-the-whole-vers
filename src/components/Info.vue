<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-flex xs12 sm11 md10 xl8>
        <v-container id="info-container-caption"
                     :style="{ width: computedStyle.widthCaption }"
                     class="my-3 elevation-8"
                     d-flex
                     align-center
                     justify-center
        >
          <div style="width: 10%">
            <svg version="1.1" viewBox="0 0 101 106" style="padding-top: 4px">
              <g ref="weWork">
                <g class="fill-auxiliary">
                  <g ref="w">
                    <path ref="wBody" d="M43.5,54.3c-4.7-3.2-7.8-6.4-9.4-9.7c-1.6-3.3-2.7-8.1-3.5-14.4h-0.9c-0.8,6.3-1.9,11.2-3.5,14.4c-1.6,3.3-4.7,6.5-9.4,9.7c-4.4-1.9-7.8-5.4-10.4-10.4c-2.6-5-4.1-11.2-4.5-18.5L1.2,13h8.4l0.8,12.1C11,34.3,13,41,16.5,45.1c0.9-1,1.8-2,2.7-3.2c0.8-1.2,1.5-2.5,2.1-3.9c0.6-1.4,1.1-2.7,1.5-3.8c0.4-1.1,0.8-2.5,1.1-4.2c0.3-1.7,0.6-3,0.7-3.8c0.1-0.8,0.3-2.1,0.5-3.8c0.2-1.7,0.4-2.7,0.4-2.9h9.1c0.1,0.2,0.2,1.2,0.4,2.9c0.2,1.7,0.4,3,0.5,3.8c0.1,0.8,0.4,2,0.7,3.8c0.3,1.7,0.7,3.1,1.1,4.2c0.4,1.1,0.9,2.4,1.5,3.8c0.6,1.4,1.3,2.7,2.1,3.9c0.8,1.2,1.7,2.2,2.7,3.2c3.5-4.2,5.6-10.8,6.2-20.1L50.6,13H59l-0.7,12.4c-0.4,7.4-1.9,13.5-4.5,18.5C51.3,48.9,47.8,52.4,43.5,54.3z"></path>

                    <g>
                      <path d="M25.3,65.9c-1.6-3.2-4.7-6.4-9.2-9.5c-4.2,2-7.4,5.5-9.8,10.5c-0.3,0.7-1,2.2-1,2.2l8.6,0c0,0,1.4-2.6,2.2-3.6c0.9,0.9,2.5,4,2.5,4l7.8-0.1C26.4,69.4,25.7,66.6,25.3,65.9z"></path>
                      <path d="M52.3,65.9c-1.6-3.2-4.7-6.4-9.2-9.5c-4.2,2-7.4,5.5-9.8,10.5c-0.3,0.7-1,2.2-1,2.2l8.6,0c0,0,1.4-2.6,2.2-3.6c0.9,0.9,2.5,4,2.5,4l7.8-0.1C53.4,69.4,52.7,66.6,52.3,65.9z"></path>
                    </g>
                  </g>

                  <path d="M93.5,69H65.1V34c0-3.2,1.1-5.8,3.4-7.8c1.5-1.3,3.2-2.2,5.1-2.6c1.9-0.4,4.2-0.6,7-0.6h12.9v5.8H79.7c-5.2,0-7.9,2-7.9,6v7.5h16.5v5.8H71.8v15.1h21.7V69z"></path>
                </g>

                <g class="fill-auxiliary">
                  <path d="M30.9,97.3c-1.8-1.4-3-2.7-3.6-4.1c-0.6-1.4-1-3.4-1.3-6.2h-0.4c-0.3,2.7-0.7,4.8-1.3,6.2c-0.6,1.4-1.8,2.8-3.6,4.1c-1.7-0.8-3-2.3-3.9-4.4c-1-2.1-1.5-4.8-1.7-7.9l-0.3-5.3h3.2l0.3,5.1c0.2,3.9,1,6.8,2.3,8.6c0.4-0.4,0.7-0.9,1-1.4c0.3-0.5,0.6-1.1,0.8-1.7c0.2-0.6,0.4-1.2,0.6-1.6c0.2-0.5,0.3-1.1,0.4-1.8c0.1-0.7,0.2-1.3,0.3-1.6c0-0.3,0.1-0.9,0.2-1.6c0.1-0.7,0.1-1.2,0.2-1.3h3.5c0,0.1,0.1,0.5,0.2,1.3c0.1,0.7,0.1,1.3,0.2,1.6c0,0.3,0.1,0.9,0.3,1.6c0.1,0.7,0.3,1.3,0.4,1.8c0.2,0.5,0.3,1,0.6,1.6c0.2,0.6,0.5,1.2,0.8,1.7c0.3,0.5,0.6,1,1,1.4c1.3-1.8,2.1-4.6,2.3-8.6l0.3-5.1h3.2l-0.3,5.3c-0.2,3.1-0.7,5.8-1.7,7.9C33.9,95,32.6,96.5,30.9,97.3z"></path>
                  <path d="M42.3,81.9c1.7-1.8,3.8-2.6,6.3-2.6c1.2,0,2.4,0.2,3.4,0.7c1.1,0.5,2,1.1,2.8,1.9c0.8,0.8,1.4,1.8,1.9,2.9c0.5,1.1,0.7,2.3,0.7,3.5s-0.2,2.4-0.7,3.5c-0.4,1.1-1.1,2-1.9,2.9c-0.8,0.8-1.7,1.5-2.8,1.9s-2.2,0.7-3.5,0.7c-1.3,0-2.4-0.2-3.5-0.7c-1.1-0.5-2-1.1-2.8-1.9c-0.8-0.8-1.4-1.8-1.9-2.9c-0.4-1.1-0.7-2.3-0.7-3.5C39.7,85.7,40.6,83.6,42.3,81.9z M48.6,82.3c-1.7,0-3,0.6-4,1.7c-1,1.1-1.5,2.5-1.5,4.3s0.5,3.2,1.5,4.3c1,1.1,2.4,1.7,4,1.7c1.7,0,3.1-0.6,4.1-1.7c1-1.1,1.5-2.5,1.5-4.3s-0.5-3.2-1.5-4.3C51.6,82.9,50.3,82.3,48.6,82.3z"></path>
                  <path d="M60.6,96.9v-9.8c0-2.8,0.5-4.7,1.5-5.7c0.5-0.5,1.1-0.9,1.8-1.2c0.7-0.3,1.4-0.4,1.9-0.5c0.5,0,1.3-0.1,2.2-0.1h3.2v3h-3.8c-0.5,0-0.9,0-1.1,0c-0.3,0-0.6,0.1-0.9,0.3c-0.4,0.1-0.7,0.4-0.9,0.7c-0.5,0.6-0.7,1.7-0.7,3.5v9.8H60.6z"></path>
                  <path d="M83.5,79.6H87l-4.4,7.5c3,0.8,4.4,3.2,4.4,7.2v2.6h-3.2v-2.6c0-1.6-0.5-2.8-1.4-3.7c-0.9-0.9-2.3-1.3-4-1.3c-0.6,0-1.1,0-1.7,0.1v7.6h-3.2V71.7h3.2v14.8c1-0.1,2-0.1,3,0L83.5,79.6z"></path>
                </g>
              </g>
            </svg>
          </div>

          <div id="select-category">
            <v-select :items="categories"
                      v-model="selectedCategory"
                      @input="popUpSnackbar"
                      dark
                      box
                      background-color="#009688"
                      color="#FFFFFF"
                      hide-details
            ></v-select>
          </div>

          <div style="width: 10%">
            <svg version="1.1" viewBox="0 0 101 106">
              <g ref="youEnjoy">
                <g class="fill-auxiliary">
                  <g>
                    <path class="fill-water" d="M7.7,38.5h25.4c0,0-1.6,7.4-12.3,10.4C20.8,48.9,6.9,46.9,7.7,38.5z"></path>

                    <path d="M38.1,23.5v3.2c0,5.3-1.2,10.1-3.6,14.5c-2.4,4.4-5.9,7.7-10.5,10v17.6h-7.5V51.3c-4.6-2.2-8.2-5.5-10.7-9.8C3.3,37.2,2,32.5,2,27.3v-3.8h7.6v3.2c0,4.4,0.8,8.3,2.3,11.4c1.6,3.2,4.3,5.8,8.1,7.8c6.9-3.8,10.4-10.2,10.4-19.2v-3.2H38.1z"></path>
                  </g>

                  <path d="M37,41.4c2.7-3.1,6-4.6,10-4.6c1.9,0,3.8,0.4,5.5,1.2c1.7,0.8,3.2,2,4.5,3.4c1.3,1.4,2.3,3.1,3,5c0.7,1.9,1.1,4,1.1,6.2c0,2.2-0.4,4.2-1.1,6.2c-0.7,1.9-1.7,3.6-2.9,5c-1.3,1.4-2.7,2.6-4.5,3.4C50.8,68,49,68.4,47,68.4c-2,0-3.9-0.4-5.6-1.2c-1.7-0.8-3.2-2-4.4-3.4c-1.3-1.4-2.2-3.1-2.9-5c-0.7-1.9-1.1-4-1.1-6.2C33,48.1,34.3,44.4,37,41.4zM47,42.1c-2.7,0-4.8,1-6.4,2.9c-1.6,1.9-2.4,4.5-2.4,7.6c0,3.1,0.8,5.7,2.4,7.6c1.6,1.9,3.8,2.9,6.4,2.9c2.7,0,4.9-1,6.5-2.9c1.6-2,2.4-4.5,2.4-7.6c0-3.1-0.8-5.6-2.4-7.6C51.9,43.1,49.7,42.1,47,42.1z"></path>

                  <g>
                    <path class="fill-water"  d="M67,29.5v27.1c0,0,2,8.7,14,8.7s14-8.7,14-8.7V29.5H67z"></path>

                    <g class="fill-auxiliary">
                      <circle ref="bubbleSix" cx="76" cy="64.2" r="1.5"></circle>
                      <circle ref="bubbleFive" cx="86" cy="64.2" r="2.5"></circle>
                      <circle ref="bubbleFour" cx="78" cy="64.2" r="2"></circle>
                      <circle ref="bubbleThree" cx="78" cy="64.2" r="3"></circle>
                      <circle ref="bubbleTwo" cx="82" cy="63.6" r="1.5"></circle>
                      <circle ref="bubbleOne" cx="83" cy="64.2" r="2"></circle>
                    </g>

                    <path d="M91.3,16.5h7.9v35.1c0,5.8-1.5,10.1-4.5,12.8c-3,2.7-7.6,4.1-13.6,4.1c-6.1,0-10.6-1.4-13.6-4.1c-3-2.7-4.5-7-4.5-12.8V16.5h7.9v36.1c0,3.3,1,4.6,3,6.1c2,1.5,3.7,2.2,7,2.2c3.4,0,5.2-0.7,7.2-2.2c2.1-1.5,3.1-2.8,3.1-6.1V16.5z"></path>
                  </g>
                </g>

                <g class="fill-auxiliary">
                  <path d="M18.6,78.3c4.1,0.2,6.1,1.9,6.1,5.1c0,4-2.6,6-7.9,6h-1.5v-2.8h1.7c1.6,0,2.7-0.2,3.3-0.7s0.9-1.3,0.9-2.5c0-0.7-0.3-1.3-0.8-1.7c-0.6-0.4-1.3-0.6-2.1-0.6c-1.7,0-3,0.6-4,1.8c-1,1.2-1.5,2.6-1.5,4.3c0,1.8,0.5,3.2,1.6,4.3c1,1.1,2.4,1.7,4.1,1.7c1.5,0,2.7-0.4,3.7-1.1l2.2,2.1c-1.7,1.3-3.6,2-5.9,2c-2.7,0-4.9-0.8-6.6-2.4c-1.6-1.6-2.4-3.7-2.4-6.2c0-2.8,0.8-5.1,2.4-6.9C13.6,79,15.8,78.2,18.6,78.3z"></path>
                  <path d="M28.5,78.7h6.2c2.7,0,4.6,0.4,5.7,1.2c1,0.7,1.7,1.5,2,2.5c0.3,1,0.4,2.3,0.4,3.8V96h-3.2v-9.7c0-0.4,0-0.8,0-1.1c0-0.3-0.1-0.7-0.3-1.2c-0.1-0.5-0.3-0.9-0.6-1.2c-0.3-0.3-0.6-0.6-1.2-0.8c-0.5-0.2-1.1-0.3-1.8-0.3h-4.1V96h-3.2V78.7z"></path>
                  <path d="M50.9,78.7v18.6c0,2.5-0.6,4.3-1.7,5.3c-1.1,1-3,1.5-5.7,1.5v-3c0.7,0,1.2,0,1.6-0.1c0.4-0.1,0.8-0.2,1.3-0.5c0.4-0.2,0.8-0.6,1-1.2s0.3-1.2,0.3-2.1V81.7h-3l1.4-3H50.9z M47.6,75.1c-0.3-0.4-0.5-0.9-0.5-1.3c0-0.5,0.2-0.9,0.5-1.3c0.3-0.4,0.8-0.6,1.4-0.6c0.6,0,1.1,0.2,1.4,0.6c0.3,0.4,0.5,0.8,0.5,1.3c0,0.5-0.2,0.9-0.5,1.3c-0.3,0.4-0.8,0.6-1.4,0.6C48.4,75.7,47.9,75.5,47.6,75.1z"></path>
                  <path d="M57.7,80.9c1.7-1.8,3.8-2.6,6.3-2.6c1.2,0,2.4,0.2,3.4,0.7c1.1,0.5,2,1.1,2.8,1.9c0.8,0.8,1.4,1.8,1.9,2.9c0.5,1.1,0.7,2.3,0.7,3.5s-0.2,2.4-0.7,3.5s-1.1,2-1.9,2.9c-0.8,0.8-1.7,1.5-2.8,1.9s-2.2,0.7-3.5,0.7c-1.3,0-2.4-0.2-3.5-0.7s-2-1.1-2.8-1.9c-0.8-0.8-1.4-1.8-1.9-2.9c-0.4-1.1-0.7-2.3-0.7-3.5C55.2,84.8,56,82.6,57.7,80.9z M64,81.3c-1.7,0-3,0.6-4.1,1.7c-1,1.1-1.5,2.5-1.5,4.3s0.5,3.2,1.5,4.3c1,1.1,2.4,1.7,4.1,1.7c1.7,0,3.1-0.6,4.1-1.7s1.5-2.5,1.5-4.3s-0.5-3.2-1.5-4.3C67.1,81.9,65.7,81.3,64,81.3z"></path>
                  <path d="M76.1,78.7h3.2v9c0,1.9,0.3,3.3,0.9,4.1c0.6,0.8,1.7,1.2,3.3,1.2h3.8V78.7h3.2v16.4c0,3-0.8,5.3-2.4,6.8s-4,2.3-7.4,2.3H78v-3h2.3c4.4,0,6.7-1.7,6.9-5.2h-3c-3.1,0-5.3-0.6-6.4-1.7c-1.1-1.1-1.7-3.3-1.7-6.7V78.7z"></path>
                </g>
              </g>
            </svg>
          </div>
        </v-container>

        <v-expansion-panel popout dark>
          <v-expansion-panel-content
            v-for="(item,i) in filteredCards"
            :key="i"
          >
            <div slot="header">{{ item.question }}</div>

            <v-card>
              <v-card-text>{{ item.text }}</v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <!--
        <v-snackbar
          v-model="snackbar"
          :multi-line="true"
          :timeout="8000"
          auto-height
          color="primary"
        >
          {{ descriptionCategory }}
          <v-btn
            @click="snackbar = false"
            dark
            flat
          >
            Close
          </v-btn>
        </v-snackbar>
        -->
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { tween, keyframes, styler, easing } from 'popmotion'

export default {
  name: 'Info',
  props: [ 'computedStyle' ],
  data () {
    return {
      selectedCategory: 'all',
      snackbar: true,
      animWBody: null,
      animBubble1: null,
      animBubble2: null,
      animBubble3: null,
      animBubble4: null
    }
  },
  methods: {
    popUpSnackbar () {
      this.snackbar = true
    }
  },
  computed: {
    cards () {
      return this.$store.getters.cards
    },
    categories () {
      return this.$store.getters.categories
    },
    filteredCards () {
      if (this.selectedCategory == 'all') {
        return this.cards
      } else {
        return this.cards.filter(card => card.category == this.selectedCategory)
      }
    },
    descriptionCategory () {
      return this.$store.getters.descriptionCategories[this.selectedCategory.toString()]
    }
  },
  mounted () {
    this.animWBody = tween({ from: -2, to: -6, duration: 2000, flip: Infinity })
      .start(v => styler(this.$refs.wBody).set('y', v))

    this.animBubble1 = keyframes({
      values: [
        { x: 0, y: 0, fill: '#26A69A' },
        { x: -1, y: 0, fill: '#26A69A' },
        { x: -2, y: -10, fill: '#C5E1A5' },
        { x: -3, y: -20, fill: '#C5E1A5' },
        { x: -4, y: -30, fill: '#DCEDC8' },
        { x: -5, y: -34, fill: '#26A69A' },
        { x: -5, y: 0, fill: '#26A69A' },
        { x: 0, y: 0, fill: '#26A69A' }
      ],
      duration: 10000,
      times: [0, 0.20, 0.30, 0.4, 0.5, 0.55, 0.56, 1],
      easings: [easing.linear, easing.linear, easing.linear, easing.linear, easing.linear, easing.linear, easing.easeIn],
      loop: Infinity
    }).start(styler(this.$refs.bubbleOne).set)

    this.animBubble2 = keyframes({
      values: [
        { x: 0, y: 0, fill: '#26A69A' },
        { x: 1, y: 0, fill: '#26A69A' },
        { x: 2, y: -10, fill: '#C5E1A5' },
        { x: 3, y: -20, fill: '#C5E1A5' },
        { x: 4, y: -30, fill: '#C5E1A5' },
        { x: 3, y: -33, fill: '#26A69A' },
        { x: 2, y: 0, fill: '#26A69A' },
        { x: 0, y: 0, fill: '#26A69A' }
      ],
      duration: 10000,
      times: [0, 0.2, 0.29, 0.37, 0.45, 0.49, 0.5, 1],
      easings: [easing.linear, easing.linear, easing.linear, easing.linear, easing.linear, easing.linear, easing.linear],
      loop: Infinity
    }).start(styler(this.$refs.bubbleThree).set)

    this.animBubble3 = keyframes({
      values: [
        { x: 0, y: 0, fill: '#26A69A' },
        { x: 0, y: 0, fill: '#26A69A' },
        { x: -2, y: -10, fill: '#C5E1A5' },
        { x: -1, y: -20, fill: '#C5E1A5' },
        { x: 0, y: -30, fill: '#DCEDC8' },
        { x: 1, y: -35, fill: '#26A69A' },
        { x: 2, y: 0, fill: '#26A69A' },
        { x: 0, y: 0, fill: '#26A69A' }
      ],
      duration: 10000,
      times: [0, 0.18, 0.26, 0.36, 0.45, 0.5, 0.51, 1],
      easings: [easing.linear, easing.linear, easing.linear, easing.linear, easing.linear, easing.linear, easing.linear],
      loop: Infinity
    }).start(styler(this.$refs.bubbleFive).set)

    this.animBubble4 = keyframes({
      values: [
        { x: 0, y: 0, fill: '#26A69A' },
        { x: 0, y: 0, fill: '#26A69A' },
        { x: -2, y: -10, fill: '#C5E1A5' },
        { x: -3, y: -20, fill: '#C5E1A5' },
        { x: -2, y: -30, fill: '#DCEDC8' },
        { x: -1, y: -34, fill: '#26A69A' },
        { x: -2, y: 0, fill: '#26A69A' },
        { x: 0, y: 0, fill: '#26A69A' }
      ],
      duration: 10000,
      times: [0, 0.22, 0.30, 0.4, 0.48, 0.52, 0.53, 1],
      easings: [easing.linear, easing.linear, easing.linear, easing.linear, easing.linear, easing.linear, easing.linear],
      loop: Infinity
    }).start(styler(this.$refs.bubbleSix).set)
  },
  beforeDestroy () {
    this.animWBody.stop()
    this.animBubble1.stop()
    this.animBubble2.stop()
    this.animBubble3.stop()
    this.animBubble4.stop()
  }
}
</script>

<style>
  #info-container-caption {
    border-radius: 2px;
    background: #009688;
  }

  #select-category {
    width: 66%;
    padding: 0 15px;
  }

  #select-category * {
    cursor: pointer;
    margin-top: 0;
  }

  ul {
    background: #FAFAFA;
  }

  .v-select.v-text-field--enclosed:not(.v-text-field--single-line) .v-select__selections {
    padding-top: 12px;
  }

  .v-text-field--box > .v-input__control > .v-input__slot, .v-text-field--full-width > .v-input__control > .v-input__slot, .v-text-field--outline > .v-input__control > .v-input__slot {
    -webkit-box-align: stretch;
    -ms-flex-align: stretch;
    align-items: stretch;
    min-height: 44px;
  }

  .v-text-field > .v-input__control > .v-input__slot:before, .v-text-field > .v-input__control > .v-input__slot:after {
    bottom: 4px;
  }

  .fill-auxiliary {
    fill: #C5E1A5;
    stroke-width: 0;
  }

  .fill-water {
    fill: #26A69A;
    stroke-width: 0;
  }
</style>
