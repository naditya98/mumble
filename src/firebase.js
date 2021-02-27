import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBvkUMaV-U3zLS32we1Gpxc2i9eIseb3Ac",
    authDomain: "mumble-f5b70.firebaseapp.com",
    databaseURL: "https://mumble-f5b70-default-rtdb.firebaseio.com",
    projectId: "mumble-f5b70",
    storageBucket: "mumble-f5b70.appspot.com",
    messagingSenderId: "595927879007",
    appId: "1:595927879007:web:d39701c23e30aedda0faea",
    measurementId: "G-WD2GDSWNWW",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);


const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage()

export { db, auth, provider, storage };