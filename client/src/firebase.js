import firebase from 'firebase/app';
import 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBePLw9_u12kEcG91cWaHzn8nbFIXnLrJQ',
  authDomain: 'ecommerce-8db64.firebaseapp.com',
  projectId: 'ecommerce-8db64',
  storageBucket: 'ecommerce-8db64.appspot.com',
  messagingSenderId: '44672183510',
  appId: '1:44672183510:web:e23692ee548b99171f6d77',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
