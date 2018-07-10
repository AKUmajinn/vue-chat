/*const config = {
  apiKey: "AIzaSyBOSGEoP3kvl2ALAbCMYvt6nPf6c4ee6YU",
  authDomain: "akuma-chat.firebaseapp.com",
  databaseURL: "https://akuma-chat.firebaseio.com",
  projectId: "akuma-chat",
  storageBucket: "akuma-chat.appspot.com",
  messagingSenderId: "471243776798"
};
export default config*/
import firebase from 'firebase'
import 'firebase/firestore'

const config = {
  apiKey: "AIzaSyBOSGEoP3kvl2ALAbCMYvt6nPf6c4ee6YU",
  authDomain: "akuma-chat.firebaseapp.com",
  databaseURL: "https://akuma-chat.firebaseio.com",
  projectId: "akuma-chat",
  storageBucket: "akuma-chat.appspot.com",
  messagingSenderId: "471243776798"
}
firebase.initializeApp(config)

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

// date issue fix according to firebase
const settings = {
  timestampsInSnapshots: true
}
db.settings(settings)

export {
  db,
  auth,
  currentUser
}
