const firebase = require('firebase/compat/app');
require ('firebase/compat/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyDUJF8-OT573VwhGhEKeJwwBilRVaPjDsY",
    authDomain: "discord-chat-11e09.firebaseapp.com",
    projectId: "discord-chat-11e09",
    storageBucket: "discord-chat-11e09.appspot.com",
    messagingSenderId: "912167279581",
    appId: "1:912167279581:web:f0497f799e479e13377434",
    measurementId: "G-TX5DFKJDEG"
}

const firebaseApp = firebase.initializeApp(firebaseConfig);
module.exports = {
    firebaseApp: firebaseApp,
    firestore: firebaseApp.firestore()
}