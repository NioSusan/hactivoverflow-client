<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <v-flex xs12 sm8 md4>
          <v-spacer></v-spacer>
          <v-btn color="error">
          <g-signin-button
              class="g-signin2"
              :params="googleSignInParams"
              @success="onSignIn"
              @error="onSignInError">
              Sign in with Google
          </g-signin-button>
          </v-btn>
        </v-flex>
        <v-form v-model="valid" @submit.prevent="login" @keydown.prevent.enter>
          <v-text-field
            v-model="user.email"
            :rules="notEmptyRules"
            label="Email"
            type="email"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.password"
            :rules="notEmptyRules"
            label="Password"
            type="password"
            required
          ></v-text-field>
          <v-btn type="submit" :disabled="!valid">Login</v-btn>
        </v-form>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import { notEmptyRules } from '@/validator'
import axios from 'axios'
import swal from 'sweetalert'

export default {
  name: 'login',
  data: vm => ({
    valid: false,
    user: {
      email: '',
      password: ''
    },
    notEmptyRules,
    googleSignInParams: {
      client_id: `${process.env.VUE_APP_CLIENT_ID}`
    }
  }),
  methods: {
    login () {
      if (this.valid) {
        axios({
          method: 'POST',
          url: 'http://server-hacktiv.hasilpanen.com/login',
          data: {
            email: this.user.email,
            password: this.user.password
          }
        })
          .then(data => {
            console.log(data)
            let token = data.data.token
            localStorage.setItem('token', token)
            swal(`${data.data.msg}`, 'Welcome!', 'success')
            this.$router.push('/questions')
          })
          .catch(err => {
            console.log(err)
            swal('Oops', 'Something went wrong!', 'error')
          })
      }
    },
    onSignIn (googleUser) {
      var profile = googleUser.getBasicProfile()
      var id_token = googleUser.getAuthResponse().id_token
      console.log(id_token)
      axios.post('http://server-hacktiv.hasilpanen.com/googleLogin', { id_token })
        .then(data => {
          let token = data.data.token
          localStorage.setItem('token', token)
          swal(`${data.data.msg}`, 'Welcome!', 'success')
          this.$router.push('/questions')
        })
        .catch(err => {
          console.log(err)
          swal('Oops', 'Something went wrong!', 'error')
        })
      console.log('ID: ' + profile.getId()) // Do not send to your backend! Use an ID token instead.
      console.log('Name: ' + profile.getName())
      console.log('Image URL: ' + profile.getImageUrl())
      console.log('Email: ' + profile.getEmail()) // This is null if the 'email' scope is not present.
    },
    onSignInError (error) {
      console.log('OH NO!', error)
      swal('OH NO!', 'Error', 'error')
    }
  },
}
</script>

<style>
.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
  cursor: pointer;
}
</style>
