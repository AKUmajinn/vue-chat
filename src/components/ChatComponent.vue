<template>

  <v-content>
    <navbar></navbar>
    <v-container>
      <h1 class="text-xs-center teal--text">AKUma-chat
        <small class="d-block subheading">Hola {{ this.name }}</small>
      </h1>
      <v-container fluid fill-height>
        <v-layout justify-center >
          <v-flex xs12 sm8 md10>
            <v-card class="elevation-5">
              <v-card-title>
              </v-card-title>
              <v-card-text>
                <ul class="c-list-unstyled">
                  <div class="flex">
                    <li v-for="register in history" v-bind:class=" {'text-xs-right': 'johanna' == register.sender} ">
                      <span class="font-weight-bold subheading teal--text"> {{register.sender}}: </span>
                      <span class="subheading grey--text text--darken-3">{{register.newMessage}}</span>
                      <span class="d-block caption grey--text time">{{register.created}}</span>
                    </li>
                  </div>

                </ul>
              </v-card-text>
              <v-card-actions>
                <new-message :name="name"></new-message>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-container>

  </v-content>
</template>
<script>
  import Navbar from './NavComponent.vue'
  import NewMessage from './NewMessage'
  export default {
    components: {
      Navbar,
      NewMessage
    },
    computed: {
      created() {
        var f = new Date();
        var hour = f.getHours()+":"+f.getMinutes();

        return hour;
      },
      user() {
        return this.$store.state.users;
      },
      name() {
        return this.$store.state.currentUser.name;
      },
      history() {
        return this.$store.state.history;
      },
      currentUser() {
        return this.$store.state.currentUser;
      },
    }
  }
</script>
<style>
  .c-list-unstyled{
    list-style: none;
    padding-left: 0;
  }
</style>
