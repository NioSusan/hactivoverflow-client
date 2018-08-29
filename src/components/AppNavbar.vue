<template>
    <v-toolbar
      app>
      <v-toolbar-title>
        <v-btn flat :to="{ name: 'home'}">Home</v-btn>
      </v-toolbar-title>
      <v-toolbar-title v-if="token">
        <v-btn flat :to="{ name: 'questions'}">Discussions</v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="!token">
        <v-btn flat :to="{ name: 'login'}">Login</v-btn>
        <v-btn flat :to="{ name: 'signup'}">SignUp</v-btn>
      </v-toolbar-items>
      <v-toolbar-items v-if="token">
        <app-avatar></app-avatar>
        <v-btn flat @click="logout">LogOut</v-btn>
      </v-toolbar-items>
    </v-toolbar>
</template>

<script>
import AppAvatar from '@/components/AppAvatar'

export default {
  props: ['user'],
  components: {
    AppAvatar
  },
  data () {
    return{
      token : null
    }
  },
  created () {
    this.token = localStorage.getItem('token')
  },
  mounted () {
      this.token = localStorage.getItem('token')
  },
  methods: {
    logout () {
      localStorage.removeItem('token')
      this.token = null
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>
