<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md5>
          <v-card class="elevation-12">
            <v-card-text>
              <v-form v-model="valid" @submit.prevent="enterChat()">
                <h1 class="text-md-center headline teal--text">Bienvenido
                  Ingresa tu nombre
                </h1>
                <v-text-field
                v-model="name"
                :rules="nameRules"
                :counter="15"
                label="Nombre"
                required
                ></v-text-field>
                <button class="v-btn white--text teal">Ingresar</button>
              </v-form>
            </v-card-text>

          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>
<script>
  export default {
    data(){
      return {
       valid: false,
       name: '',
       nameRules: [
       v => !!v || 'Ingrese un Nombre',
       v => v.length <= 15 || 'El nombre debe contener máximo 15 caracteres',
       v => !/\s/.test(v) || 'El nombre no puede contener espacios'
       ],
       email: '',
       emailRules: [
       v => !!v || 'Ingrese su Email',
       v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Ingrese un Email válido'
       ]
     }
   },
   methods: {
    enterChat(){
      if(this.name){
        var name = this.name;
        //guarda los datos del usuario en currentUser (state) y los registra en firestore, mas info leer la mutacion "getFirestoreData" en store.js
        this.$router.push({ name: 'chat' })
        this.$store.dispatch('nameUser', name);
      }
    }
   }
 }
</script>
