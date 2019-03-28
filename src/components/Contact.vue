<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm10 md8 xl6>
        <v-card class="mt-2 elevation-8">
          <v-card-title
            class="body-2 font-weight-medium teal white--text font-weight-regular"
          >
            Question? Offer? Just write to me:
          </v-card-title>

          <v-card-text>
            <v-form ref="formForContact" validation>
              <v-text-field
                name="subject"
                label="Subject"
                v-model="subjectForContact"
                maxlength="80"
                clearable
                hint="optional field"
                prepend-icon="subject"
              ></v-text-field>

              <v-textarea
                name="message"
                label="Message"
                v-model="messageForContact"
                :rules="messageRules"
                validate-on-blur
                maxlength="800"
                clearable
                prepend-icon="message"
              ></v-textarea>

              <v-text-field
                name="email"
                label="E-mail"
                type="email"
                v-model="emailForContact"
                :rules="emailRules"
                validate-on-blur
                maxlength="30"
                clearable
                hint="optional field"
                prepend-icon="person"
              ></v-text-field>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              @click="onSubmitForContact"
              :loading="loading"
              color="primary"
            >ok</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Contact',
  data () {
    return {
      subjectForContact: '',
      messageForContact: '',
      emailForContact: this.$store.getters.email,
      messageRules: [v => !!v || 'Message is required'],
      emailRules: [v => !v || /.+@.+/.test(v) || 'There\'s something wrong with e-mail!']
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    onSubmitForContact () {
      if (this.$refs.formForContact.validate()) {
        const letter = {
          subject: this.subjectForContact,
          message: this.messageForContact,
          email: this.emailForContact
        }

        this.$store.dispatch('sendLetter', letter)
          .then(result => {
            if (result == 'ok') {
              this.$refs.formForContact.reset()
              setTimeout(() => alert('The letter has been delivered!', 0))
            }
          })
      }
    }
  }
}
</script>
