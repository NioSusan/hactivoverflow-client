<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <v-form v-model="valid" @submit.prevent="signUp" @keydown.prevent.enter>
          <v-text-field
            v-model="user.name"
            :rules="notEmptyRules"
            label="Name"
            required
          ></v-text-field>
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
          <v-text-field
            v-model="user.confirmPassword"
            :rules="confirmPasswordRules"
            label="Confirm Password"
            type="password"
            required
          ></v-text-field>
          <v-btn type="submit" :disabled="!valid">SignUp</v-btn>
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
  name: 'signUp',
  data: vm => ({
    valid: false,
    user: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    notEmptyRules,
    confirmPasswordRules: [confirmPassword => confirmPassword === vm.user.password || 'Password must match.']
  }),
  methods: {
    signUp () {
      if (this.valid) {
        console.log('register!')
        axios({
          method: 'POST',
          url: 'http://server-hacktiv.hasilpanen.com/register',
          data: {
            name: this.user.name,
            email: this.user.email,
            password: this.user.password
          }
        })
          .then(data => {
            this.$router.push('/login')
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  }
}
</script>
