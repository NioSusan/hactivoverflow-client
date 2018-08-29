<template>
  <v-app>
    <app-navbar> </app-navbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2018 - made with <v-icon>fa fa-heart</v-icon> by SN</span>
    </v-footer>
  </v-app>
</template>

<script>
import AppNavbar from '@/components/AppNavbar'
import { mapState } from 'vuex'
export default {
  name: 'App',
  components: {
    AppNavbar
  },
  data () {
    return {
      fixed: false
    }
  },
  methods: {
    logout () {
      console.log('logout')
      this.$router.push('/login')
    }
  }
}
</script>
