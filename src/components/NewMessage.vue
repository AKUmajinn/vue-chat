<template>
  <v-flex xs10 offset-xs1 class="new-message">
    <v-form @submit.prevent="addNewMessage">
      <v-text-field
      :name="name"
      label="Nuevo Mensaje:"
      v-model="newMessage"
      ></v-text-field>
    </v-form>
  </v-flex xs10 offset-xs1>
</template>
<script>
  export default {
    data(){
      return {
        newMessage: null,
      }

    },
    computed: {
      name(){
        //se necesita para enviarlo al mandar el mensaje {created, sender, newMessage}
        return this.$store.state.currentUser.name;
      },
      currentUser() {
        return this.$store.state.currentUser;
      },
      sender() {
        return this.name;
      }
    },
    methods: {
      addNewMessage() {
        var created = this.getTime();
        console.log(created);
        var sender = this.name;
        var newMessage = this.newMessage;
        this.$store.dispatch('addNewMessage', {created, sender, newMessage});
        this.newMessage = ""
      },
      getTime() {
        var f =  new Date();
        var result = f.getHours()+":"+f.getMinutes();
        return result;
      }
    }
  }
</script>
