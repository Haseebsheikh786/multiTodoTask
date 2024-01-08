import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD6e1xz9HddeW162eswWJ4ENN2MZZbhRsk",
    authDomain: "todo-3d451.firebaseapp.com",
    projectId: "todo-3d451",
    storageBucket: "todo-3d451.appspot.com",
    messagingSenderId: "673468190262",
    appId: "1:673468190262:web:c263434e6b922f07491297",
    measurementId: "G-QJY64SN7TM",
};

firebase.initializeApp(firebaseConfig);
export const firestore = firebase.firestore();
