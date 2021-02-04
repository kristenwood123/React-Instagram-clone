import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyB3_jYbMxdIsUebBM1eglJOpv7MQEeGBP4",
  authDomain: "instagram-clone-react-12aca.firebaseapp.com",
  databaseURL: "https://instagram-clone-react-12aca-default-rtdb.firebaseio.com",
  projectId: "instagram-clone-react-12aca",
  storageBucket: "instagram-clone-react-12aca.appspot.com",
  messagingSenderId: "398944784552",
  appId: "1:398944784552:web:41ab99ed1348ba801b729d",
  measurementId: "G-JCGH7GDDT2"
})


const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export { db, auth, storage }


