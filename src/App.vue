<template>
  <v-app>
    <v-navigation-drawer
      class="mt-5"
      width="180"
      app
      temporary
      disable-route-watcher
      v-model="drawer"
    >
      <v-list>
        <v-list-tile :to="'/'" ripple>
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title v-text="'home'"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-divider></v-divider>

        <v-list-tile :to="'/info'" ripple>
          <v-list-tile-action>
            <v-icon>info</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title v-text="'info'"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-divider></v-divider>

        <v-list-tile :to="'/contact'" ripple>
          <v-list-tile-action>
            <v-icon>question_answer</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title v-text="'contact'"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-divider></v-divider>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar
      fixed
      dense
      scroll-off-screen
      dark
      color="primary"
    >
      <span class="pb-2">
        <svg version="1.1" width="110px" viewBox="0 0 204 35" fill="#C5E1A5">
          <g>
            <path d="M3.6,11.8C5.3,10,7.4,9,9.9,9c1.2,0,2.4,0.2,3.4,0.7c1.1,0.5,2,1.2,2.8,2c0.8,0.9,1.4,1.9,1.9,3c0.5,1.2,0.7,2.4,0.7,3.7c0,1.3-0.2,2.6-0.7,3.7c-0.4,1.2-1.1,2.2-1.9,3c-0.8,0.9-1.7,1.5-2.8,2c-1.1,0.5-2.2,0.7-3.5,0.7c-1.3,0-2.4-0.2-3.5-0.7c-1.1-0.5-2-1.2-2.8-2c-0.8-0.9-1.4-1.9-1.9-3c-0.4-1.2-0.7-2.4-0.7-3.7C1.1,15.9,2,13.6,3.6,11.8zM9.9,12.2c-1.7,0-3,0.6-4,1.8c-1,1.2-1.5,2.7-1.5,4.6c0,1.9,0.5,3.4,1.5,4.6c1,1.2,2.4,1.8,4,1.8c1.7,0,3.1-0.6,4.1-1.8c1-1.2,1.5-2.7,1.5-4.6c0-1.9-0.5-3.4-1.5-4.6C13,12.8,11.6,12.2,9.9,12.2z"></path>
            <path d="M37.7,25c-1.8-1.5-3-2.9-3.6-4.4c-0.6-1.5-1-3.7-1.3-6.5h-0.4c-0.3,2.9-0.7,5.1-1.3,6.5c-0.6,1.5-1.8,2.9-3.6,4.4c-1.7-0.9-3-2.4-3.9-4.7c-1-2.3-1.5-5.1-1.7-8.4l-0.3-5.6h3.2l0.3,5.5c0.2,4.2,1,7.2,2.3,9.1c0.4-0.4,0.7-0.9,1-1.5c0.3-0.5,0.6-1.1,0.8-1.8c0.2-0.7,0.4-1.2,0.6-1.7c0.2-0.5,0.3-1.1,0.4-1.9c0.1-0.8,0.2-1.3,0.3-1.7c0-0.4,0.1-0.9,0.2-1.7c0.1-0.8,0.1-1.2,0.2-1.3h3.5c0,0.1,0.1,0.5,0.2,1.3c0.1,0.8,0.1,1.4,0.2,1.7c0,0.4,0.1,0.9,0.3,1.7c0.1,0.8,0.3,1.4,0.4,1.9c0.2,0.5,0.3,1.1,0.6,1.7c0.2,0.6,0.5,1.2,0.8,1.8c0.3,0.5,0.6,1,1,1.5c1.3-1.9,2.1-4.9,2.3-9.1l0.3-5.5h3.2l-0.3,5.6c-0.2,3.3-0.7,6.1-1.7,8.4C40.7,22.5,39.4,24.1,37.7,25z"></path>
            <path d="M62.2,28.1c-1.8-1.5-3-2.9-3.6-4.4c-0.6-1.5-1-3.7-1.3-6.5h-0.4c-0.3,2.9-0.7,5.1-1.3,6.5c-0.6,1.5-1.8,2.9-3.6,4.4c-1.7-0.9-3-2.4-3.9-4.7c-1-2.3-1.5-5.1-1.7-8.4l-0.3-5.6h3.2l0.3,5.5c0.2,4.2,1,7.2,2.3,9.1c0.4-0.4,0.7-0.9,1-1.5c0.3-0.5,0.6-1.1,0.8-1.8c0.2-0.7,0.4-1.2,0.6-1.7c0.2-0.5,0.3-1.1,0.4-1.9c0.1-0.8,0.2-1.3,0.3-1.7c0-0.4,0.1-0.9,0.2-1.7c0.1-0.8,0.1-1.2,0.2-1.3h3.5c0,0.1,0.1,0.5,0.2,1.3c0.1,0.8,0.1,1.4,0.2,1.7c0,0.4,0.1,0.9,0.3,1.7c0.1,0.8,0.3,1.4,0.4,1.9c0.2,0.5,0.3,1.1,0.6,1.7c0.2,0.6,0.5,1.2,0.8,1.8c0.3,0.5,0.6,1,1,1.5c1.3-1.9,2.1-4.9,2.3-9.1l0.3-5.5h3.2L67.8,15c-0.2,3.3-0.7,6.1-1.7,8.4C65.1,25.7,63.8,27.3,62.2,28.1z"></path>
            <path d="M86.7,26c-1.8-1.5-3-2.9-3.6-4.4c-0.6-1.5-1-3.7-1.3-6.5h-0.4c-0.3,2.9-0.7,5.1-1.3,6.5c-0.6,1.5-1.8,2.9-3.6,4.4c-1.7-0.9-3-2.4-3.9-4.7c-1-2.3-1.5-5.1-1.7-8.4l-0.3-5.6h3.2l0.3,5.5c0.2,4.2,1,7.2,2.3,9.1c0.4-0.4,0.7-0.9,1-1.5c0.3-0.5,0.6-1.1,0.8-1.8c0.2-0.7,0.4-1.2,0.6-1.7c0.2-0.5,0.3-1.1,0.4-1.9c0.1-0.8,0.2-1.3,0.3-1.7c0-0.4,0.1-0.9,0.2-1.7c0.1-0.8,0.1-1.2,0.2-1.3h3.5c0,0.1,0.1,0.5,0.2,1.3c0.1,0.8,0.1,1.4,0.2,1.7c0,0.4,0.1,0.9,0.3,1.7c0.1,0.8,0.3,1.4,0.4,1.9c0.2,0.5,0.3,1.1,0.6,1.7c0.2,0.6,0.5,1.2,0.8,1.8c0.3,0.5,0.6,1,1,1.5c1.3-1.9,2.1-4.9,2.3-9.1l0.3-5.5h3.2l-0.3,5.6c-0.2,3.3-0.7,6.1-1.7,8.4C89.6,23.6,88.3,25.2,86.7,26z"></path>
            <path d="M96,20.5V1h3.2v19.5c0,0.9,0.1,1.7,0.3,2.2c0.2,0.6,0.5,1,1,1.2c0.4,0.2,0.9,0.4,1.3,0.5c0.4,0.1,0.9,0.1,1.6,0.1v3.2c-2.7,0-4.6-0.5-5.7-1.6C96.5,25,96,23.1,96,20.5z"></path>
            <path d="M117.7,9.4v3.2h-6.4c-0.7,0-1.3,0.1-1.8,0.4c-0.5,0.3-0.8,0.7-0.8,1.2c0,0.3,0.1,0.6,0.2,0.8c0.1,0.2,0.3,0.4,0.4,0.6c0.2,0.2,0.4,0.3,0.7,0.5c0.3,0.2,0.6,0.3,0.8,0.3c0.2,0.1,0.9,0.3,2.3,0.8c1.3,0.5,2.3,0.8,3,1.1c0.6,0.3,1.1,0.7,1.5,1.2c0.3,0.5,0.6,1,0.7,1.5c0.1,0.5,0.1,1,0.1,1.5c0,3.4-2.2,5.1-6.6,5.1h-6.2v-3.2h6.2c2.3,0,3.4-0.6,3.4-1.9c0-0.6-0.3-1.1-1-1.5c-0.7-0.4-1.5-0.8-2.4-1c-0.9-0.3-1.9-0.6-2.8-1c-0.9-0.4-1.8-1-2.4-1.8c-0.7-0.8-1-1.9-1-3.1c0-1.6,0.6-2.7,1.7-3.6c1.1-0.8,2.5-1.2,4.1-1.2H117.7z"></path>
          </g>
          <g>
            <path d="M30.7,29.6c-0.6-1.5-1.8-2.9-3.6-4.4c-1.7,0.9-3,2.4-3.9,4.7c-0.1,0.3-0.2,0.6-0.3,0.9c1.1,0,2.3,0,3.4,0c0.2-0.5,0.5-1,0.8-1.4c0.4,0.4,0.7,0.9,1,1.4c1,0,2,0,3.1,0C31,30.4,30.9,30,30.7,29.6z"></path>
            <path d="M41.2,29.9c-1-2.3-2.3-3.8-4-4.7c-1.8,1.5-3,2.9-3.6,4.4c-0.1,0.4-0.3,0.8-0.4,1.2c1,0,2,0,3,0c0.3-0.5,0.6-1,1-1.5c0.3,0.4,0.6,0.9,0.8,1.5c1.1,0,2.2,0,3.4,0C41.5,30.5,41.4,30.2,41.2,29.9z"></path>
          </g>
          <g>
            <path d="M55.7,32.8c-0.6-1.5-1.8-2.9-3.6-4.4c-1.7,0.9-3,2.4-3.9,4.7c-0.1,0.3-0.2,0.6-0.3,0.9c1.1,0,2.3,0,3.4,0c0.2-0.5,0.5-1,0.8-1.4c0.4,0.4,0.7,0.9,1,1.4c1,0,2,0,3.1,0C56,33.6,55.9,33.2,55.7,32.8z"></path>
            <path d="M66.2,33.1c-1-2.3-2.3-3.8-4-4.7c-1.8,1.5-3,2.9-3.6,4.4c-0.1,0.4-0.3,0.8-0.4,1.2c1,0,2,0,3,0c0.3-0.5,0.6-1,1-1.5c0.3,0.4,0.6,0.9,0.8,1.5c1.1,0,2.2,0,3.4,0C66.5,33.7,66.4,33.4,66.2,33.1z"></path>
          </g>
          <g>
            <path d="M139.7,32.8c-0.6-1.5-1.8-2.9-3.6-4.4c-1.7,0.9-3,2.4-3.9,4.7c-0.1,0.3-0.2,0.6-0.3,0.9c1.1,0,2.3,0,3.4,0c0.2-0.5,0.5-1,0.8-1.4c0.4,0.4,0.7,0.9,1,1.4c1,0,2,0,3.1,0C140,33.6,139.9,33.2,139.7,32.8z"></path>
            <path d="M150.2,33.1c-1-2.3-2.3-3.8-4-4.7c-1.8,1.5-3,2.9-3.6,4.4c-0.1,0.4-0.3,0.8-0.4,1.2c1,0,2,0,3,0c0.3-0.5,0.6-1,1-1.5c0.3,0.4,0.6,0.9,0.8,1.5c1.1,0,2.2,0,3.4,0C150.5,33.7,150.4,33.4,150.2,33.1z"></path>
          </g>
          <g>
            <path d="M79.7,30.7c-0.6-1.5-1.8-2.9-3.6-4.4c-1.7,0.9-3,2.4-3.9,4.7c-0.1,0.3-0.2,0.6-0.3,0.9c1.1,0,2.3,0,3.4,0c0.2-0.5,0.5-1,0.8-1.4c0.4,0.4,0.7,0.9,1,1.4c1,0,2,0,3.1,0C80,31.4,79.9,31,79.7,30.7z"></path>
            <path d="M90.2,30.9c-1-2.3-2.3-3.8-4-4.7c-1.8,1.5-3,2.9-3.6,4.4c-0.1,0.4-0.3,0.8-0.4,1.2c1,0,2,0,3,0c0.3-0.5,0.6-1,1-1.5c0.3,0.4,0.6,0.9,0.8,1.5c1.1,0,2.2,0,3.4,0C90.5,31.6,90.4,31.2,90.2,30.9z"></path>
          </g>
          <g>
            <path d="M123.6,27.5c-0.4-0.5-0.6-1-0.6-1.7c0-0.7,0.2-1.2,0.6-1.7c0.4-0.5,1-0.7,1.6-0.7s1.2,0.2,1.6,0.7c0.4,0.5,0.6,1,0.6,1.7c0,0.7-0.2,1.2-0.6,1.7s-1,0.7-1.6,0.7S124,28,123.6,27.5z"></path>
            <path d="M146,28.2c-1.8-1.5-3-2.9-3.6-4.4c-0.6-1.5-1-3.7-1.3-6.6h-0.4c-0.3,2.9-0.7,5.1-1.3,6.6c-0.6,1.5-1.8,3-3.6,4.4c-1.7-0.9-3-2.4-3.9-4.7c-1-2.3-1.5-5.1-1.7-8.4l-0.3-5.6h3.2l0.3,5.5c0.2,4.2,1,7.2,2.3,9.1c0.4-0.4,0.7-0.9,1-1.5c0.3-0.5,0.6-1.1,0.8-1.8c0.2-0.7,0.4-1.2,0.6-1.7c0.2-0.5,0.3-1.1,0.4-1.9c0.1-0.8,0.2-1.3,0.3-1.7c0-0.4,0.1-0.9,0.2-1.7c0.1-0.8,0.1-1.2,0.2-1.3h3.4c0,0.1,0.1,0.6,0.2,1.3c0.1,0.8,0.1,1.4,0.2,1.7c0,0.4,0.1,0.9,0.3,1.7c0.1,0.8,0.3,1.4,0.4,1.9c0.2,0.5,0.3,1.1,0.6,1.7c0.2,0.7,0.5,1.2,0.8,1.8c0.3,0.5,0.6,1,1,1.5c1.3-1.9,2.1-4.9,2.3-9.1l0.3-5.5h3.2l-0.3,5.6c-0.2,3.4-0.7,6.2-1.7,8.4C148.9,25.8,147.6,27.4,146,28.2z"></path>
            <path d="M157.2,11.9c1.7-1.9,3.8-2.8,6.3-2.8c1.2,0,2.4,0.2,3.4,0.7s2,1.2,2.8,2.1s1.4,1.9,1.9,3c0.5,1.2,0.7,2.4,0.7,3.7s-0.2,2.6-0.7,3.7c-0.4,1.2-1.1,2.2-1.9,3c-0.8,0.9-1.7,1.6-2.8,2.1c-1.1,0.5-2.2,0.7-3.5,0.7c-1.3,0-2.4-0.2-3.5-0.7c-1.1-0.5-2-1.2-2.8-2.1c-0.8-0.9-1.4-1.9-1.8-3c-0.4-1.2-0.7-2.4-0.7-3.7C154.7,15.9,155.6,13.7,157.2,11.9z M163.5,12.3c-1.7,0-3,0.6-4,1.8c-1,1.2-1.5,2.7-1.5,4.6s0.5,3.4,1.5,4.6c1,1.2,2.4,1.8,4,1.8c1.7,0,3.1-0.6,4.1-1.8c1-1.2,1.5-2.7,1.5-4.6s-0.5-3.4-1.5-4.6S165.2,12.3,163.5,12.3z"></path>
            <path d="M175.6,27.9V17.4c0-2.9,0.5-5,1.5-6.1c0.5-0.6,1.1-1,1.8-1.3c0.7-0.3,1.3-0.4,1.9-0.5c0.5-0.1,1.3-0.1,2.2-0.1h3.2v3.2h-3.8c-0.5,0-0.8,0-1.1,0c-0.3,0-0.6,0.1-0.9,0.3c-0.4,0.2-0.7,0.4-0.9,0.7c-0.5,0.6-0.7,1.8-0.7,3.7v10.5H175.6z"></path>
            <path d="M198.4,9.4h3.5l-4.3,8c2.9,0.8,4.4,3.4,4.4,7.6v2.8h-3.2v-2.8c0-1.7-0.5-3-1.4-4c-0.9-0.9-2.3-1.4-4-1.4c-0.6,0-1.1,0-1.7,0.1v8.1h-3.2V1h3.2v15.8c1-0.2,2-0.2,3,0L198.4,9.4z"></path>
          </g>
        </svg>
      </span>

      <v-spacer></v-spacer>

      <v-toolbar-side-icon
        v-if="this.$vuetify.breakpoint.lgAndDown"
        @click="drawer = !drawer"
      ></v-toolbar-side-icon>

      <v-toolbar-items v-if="!this.$vuetify.breakpoint.lgAndDown">
        <v-btn :to="'/'" class="bauman" flat>
          <v-icon color="auxiliary" left>home</v-icon>
          home
        </v-btn>

        <v-divider vertical></v-divider>

        <v-btn :to="'/info'" flat>
          <v-icon color="auxiliary" left>info</v-icon>
          info
        </v-btn>

        <v-divider vertical></v-divider>

        <v-btn :to="'/contact'" flat>
          <v-icon color="auxiliary" left>question_answer</v-icon>
          contact
        </v-btn>
      </v-toolbar-items>

      <v-spacer></v-spacer>

      <v-divider vertical></v-divider>

      <v-toolbar-items v-if="!loggedIn">
        <v-btn style="padding-right: 0" :to="'/login'" class="baumans" color="white" flat>
          LOG IN
          <v-icon color="auxiliary" right>exit_to_app</v-icon>
        </v-btn>
      </v-toolbar-items>

      <v-toolbar-items v-else>
        <v-btn style="padding-right: 0" :to="'/logout'" class="baumans" color="white" flat>
          LOG OUT
          <v-icon color="auxiliary" right>exit_to_app</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
        <router-view :computedStyle="computedStyle"></router-view>
    </v-content>

    <template v-if="error">
      <v-snackbar
        @input="closeError"
        :value="true"
        :multi-line="true"
        :timeout="10000"
        color="primary"
      >
        {{ error }}
        <v-btn
          @click="closeError"
          dark
          flat
        >
          Close
        </v-btn>
      </v-snackbar>
    </template>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      drawer: false
    }
  },
  computed: {
    loggedIn () {
      return this.$store.getters.loggedIn
    },
    error () {
      return this.$store.getters.error
    },
    computedStyle () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return { fontSizeH1: '1.7em', fontSizeP: '1.3em', widthCaption: '100%' }
        case 'sm': return { fontSizeH1: '2em', fontSizeP: '1.5em', widthCaption: '90%' }
        case 'md': return { fontSizeH1: '2.2em', fontSizeP: '1.7em', widthCaption: '80%' }
        case 'lg': return { fontSizeH1: '2.7em', fontSizeP: '2em', widthCaption: '77%' }
        case 'xl': return { fontSizeH1: '3em', fontSizeP: '2.2em', widthCaption: '75%' }
      }
    }
  },
  methods: {
    closeError () {
      this.$store.dispatch('clearError')
    }
  },
  created () {
    this.$store.dispatch('defendUser', this.$cookie.get('defense'))
  }
}
</script>

<style>
  h1 {
    font-family: 'Allerta Stencil', Roboto, Arial, sans-serif;
    font-weight: 300;
    line-height: 1.2em;
    text-align: center;
    margin: 20px auto;
    color: #00ACC1;
  }

  p {
    font-family: 'Roboto Mono', Roboto, Arial, sans-serif;
    font-weight: 300;
    text-align: justify;
    margin-bottom: 25px;
    color: #546E7A;
  }

  .v-navigation-drawer {
    font-family: Quicksand, Roboto, Arial, sans-serif;
  }

  .v-content {
    margin-top: 48px;
  }

  .container {
    padding: 0 16px;
    max-width: 100%;
  }

  .v-btn, .v-tabs, .v-card {
    font-family: Quicksand, Roboto, Arial, sans-serif;
    letter-spacing: 2px;
    text-transform: none;
  }

  .v-tabs__container {
    height: 52.67px;
  }

  .v-tabs__item {
    padding: 16px;
  }

  .baumans {
    font-family: Baumans, Roboto, Arial, sans-serif;
  }
</style>
