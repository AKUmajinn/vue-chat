<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
  import Welcome from './components/WelcomeComponent.vue'
  export default {
    components: {
      Welcome
    },
    created(){
      this.$store.dispatch('getFirestoreDataUsers');
      this.$store.dispatch('getFirestoreDataHistory');
    }
  }
</script>
