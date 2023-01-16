import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBpEMRr4FuUWG7D3g0eKV_-kG5gV-DsHvg",
    authDomain: "linkedin-clone-e372c.firebaseapp.com",
    projectId: "linkedin-clone-e372c",
    storageBucket: "linkedin-clone-e372c.appspot.com",
    messagingSenderId: "703320216246",
    appId: "1:703320216246:web:1c13d3bbfb467339984c17",
    measurementId: "G-BP8FCB3D1Q"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export {db,auth} ;