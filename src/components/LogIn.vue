<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm10 md8 xl6>
        <v-tabs
          class="mt-2 elevation-8"
          color="primary"
          slider-color="auxiliarySecond"
          dark
        >
          <v-tab ripple>LOG IN</v-tab>

          <v-tab ripple>REGISTRATION</v-tab>

          <v-tab-item>
            <v-card>
              <v-card-text>
                <v-form ref="formForLogIn" validation>
                  <v-text-field
                    name="email"
                    label="E-mail"
                    type="email"
                    v-model="emailForLogIn"
                    :rules="emailRules"
                    validate-on-blur
                    maxlength="30"
                    prepend-icon="person"
                  ></v-text-field>

                  <v-text-field
                    name="password"
                    label="Password"
                    type="password"
                    v-model="passwordForLogIn"
                    :rules="passwordRules"
                    validate-on-blur
                    maxlength="40"
                    prepend-icon="lock"
                  ></v-text-field>
                </v-form>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  @click="onSubmitForLogIn"
                  :loading="loading"
                  color="primary"
                >ok</v-btn>
              </v-card-actions>
            </v-card>
          </v-tab-item>

          <v-tab-item>
            <v-card class="elevation-8">
              <v-card-text>
                <v-form ref="formForRegistration" validation>
                  <v-text-field
                    name="email"
                    label="E-mail"
                    type="email"
                    v-model="emailForRegistration"
                    :rules="emailRules"
                    validate-on-blur
                    maxlength="30"
                    prepend-icon="person"
                  ></v-text-field>

                  <v-text-field
                    name="password"
                    label="Password"
                    type="password"
                    v-model="passwordForRegistration"
                    :rules="passwordRules"
                    validate-on-blur
                    maxlength="40"
                    prepend-icon="lock"
                  ></v-text-field>

                  <v-text-field
                    name="confirm-password"
                    label="Confirm Password"
                    type="password"
                    v-model="confirmPasswordForRegistration"
                    :rules="confirmPasswordRules"
                    validate-on-blur
                    maxlength="40"
                    prepend-icon="lock"
                  ></v-text-field>
                </v-form>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  @click="onSubmitForRegistration"
                  :loading="loading"
                  color="primary"
                >ok</v-btn>
              </v-card-actions>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'LogIn',
  data () {
    return {
      emailForLogIn: '',
      passwordForLogIn: '',
      emailForRegistration: '',
      passwordForRegistration: '',
      confirmPasswordForRegistration: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'There\'s something wrong with e-mail!'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || 'Password must be not less than 6 characters'
      ],
      confirmPasswordRules: [
        v => !!v || 'Password is required',
        v => v === this.passwordForRegistration || 'Passwords not match!'
      ]
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    onSubmitForLogIn () {
      if (this.$refs.formForLogIn.validate()) {
        const user = {
          email: this.emailForLogIn,
          password: this.passwordForLogIn
        }

        this.$store.dispatch('loginUser', user)
          .then(defense => {
            this.$cookie.set('defense', defense, { expires: '1Y' })
            if (this.$store.getters.loggedIn) this.$router.push('/')
          })
      }
    },
    onSubmitForRegistration () {
      if (this.$refs.formForRegistration.validate()) {
        const user = {
          email: this.emailForRegistration,
          password: this.passwordForRegistration
        }

        this.$store.dispatch('registerUser', user)
          .then(defense => {
            this.$cookie.set('defense', defense, { expires: '1Y' })
            if (this.$store.getters.loggedIn) this.$router.push('/')
          })
      }
    }
  }
}
</script>
