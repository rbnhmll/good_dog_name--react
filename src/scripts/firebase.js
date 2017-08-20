import * as firebase from 'firebase';
export let database;

export const init = () => {
  const config = {
    apiKey: "AIzaSyA6m-uIPo6i4X2qt59RxpJIeSZGd_itM7g",
    authDomain: "good-dog-name.firebaseapp.com",
    databaseURL: "https://good-dog-name.firebaseio.com",
    projectId: "good-dog-name",
    storageBucket: "",
    messagingSenderId: "688318345988"
  };
  firebase.initializeApp(config);
  database = firebase.database();
}