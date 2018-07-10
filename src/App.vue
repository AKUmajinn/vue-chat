<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
  export default {
    created(){
      this.$store.dispatch('getFirestoreDataUsers');
      this.$store.dispatch('getFirestoreDataHistory');
    }
  }
</script>
