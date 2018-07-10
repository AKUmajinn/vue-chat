import Vue from 'vue';
import Vuex from 'vuex';
const fb = require('../firebase/firebase.config.js')
/*import Firebase from 'Firebase'
import 'Firebase/firestore'
import config from '../firebase/firebase.config.js'*/

/*const firebaseApp = Firebase.initializeApp(config)

fb.db.settings({ timestampsInSnapshots: true})*/

Vue.use(Vuex);

export const store = new Vuex.Store({
  state:{
    history:[],
    currentUser: {},
    users:[]
  },
  getters:{},
  mutations:{
    getFirestoreDataUsers(state) {
      //trae la data de firestore y la carga en el state

      fb.db.collection("users").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          state.users.push({
            id: doc.id,
            email: doc.email,
            name: doc.name
          })
        });
      });
    },
    getFirestoreDataHistory(state) {
      //trae la data de firestore y la carga en el state
      fb.db.collection("history").orderBy("idOrder", "asc").limit(15)
      .onSnapshot((querySnapshot) => {
        //ya que esto se ejecuta cada que hay cambios, si no se elimina todo el historial del state, duplicaria todo el historial
        state.history = []
        querySnapshot.forEach(function(doc) {
          state.history.push({
            id: doc.data().id,
            created: doc.data().created,
            sender: doc.data().sender,
            newMessage: doc.data().newMessage
          })

        });
      })

    },
    nameUser(state, name) {
      //agrega el nombre del usuario en firestore y en currentUser
      fb.db.collection("users").add({
        name: name
      })
      .then(function(docRef) {
        //captura el id del usuario ingresado, para poder traer su data desde firestore a travez del id mismo
        Vue.set(state, 'currentUser', {
          name: name,
          id: docRef.id
        })
        /*state.currentUser = {
          name: name,
          id: docRef.id
        }*/
        console.log("state.currentUser: ", state.currentUser);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
    },
    addNewMessage(state, {created, sender, newMessage}) {
      fb.db.collection("history").add({
        idOrder: Date.now(),
        created: created,
        sender: sender,
        newMessage: newMessage
      })
      .then(function(docRef) {
        console.log("addNewMessage: ", state.history);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
    },
  },
  actions:{
    getFirestoreDataUsers(context) {
      //se llama en app, vue (para que se traiga toda la data de firestore ni bien se cree la app)
      context.commit('getFirestoreDataUsers');
    },
    getFirestoreDataHistory(context) {
      //se llama en app, vue (para que se traiga toda la data de firestore ni bien se cree la app)
      context.commit('getFirestoreDataHistory');
    },
    //se llama en WelcomeComponent
    nameUser(context, name) {
      context.commit('nameUser', name);
    },
    addNewMessage(context, {created, sender, newMessage}) {
      //se llama en NewMessage
      context.commit('addNewMessage', {created, sender, newMessage});
    },
  }
})
