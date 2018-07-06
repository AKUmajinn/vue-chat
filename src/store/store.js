import Vue from 'vue';
import Vuex from 'vuex';
import Firebase from 'Firebase'
import 'Firebase/firestore'
import config from '../firebase/firebase.config.js'

const firebaseApp = Firebase.initializeApp(config)

firebaseApp.firestore().settings({ timestampsInSnapshots: true})

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

      firebaseApp.firestore().collection("users").get().then((querySnapshot) => {
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
      firebaseApp.firestore().collection("history")
      .onSnapshot(function(querySnapshot) {
        console.log(querySnapshot);
        querySnapshot.forEach((doc) => {
          state.history.push({
            id: doc.data().id,
            created: doc.data().created,
            sender: doc.data().sender,
            newMessage: doc.data().newMessage
          })
        });
      }, function(error) {
        //...
      });


      firebaseApp.firestore().collection("history").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          state.history.push({
            id: doc.data().id,
            created: doc.data().created,
            sender: doc.data().sender,
            newMessage: doc.data().newMessage
          })
        });
      });
    },
    nameUser(state, name) {
      //agrega el nombre del usuario en firestore y en currentUser
      firebaseApp.firestore().collection("users").add({
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
      firebaseApp.firestore().collection("history").add({
        created: created,
        sender: sender,
        newMessage: newMessage
      })
      .then(function(docRef) {
        /*Vue.set(state, 'currentUser', {
          name: name,
          id: docRef.id
        })*/
        state.history.push({
        created: created,
        sender: sender,
        newMessage: newMessage

        })
        console.log("state.history: ", state.history);
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
