import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/database';
import {getFirestore} from 'firebase/firestore'

const app = firebase.initializeApp({
    // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    // databaseUrl: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    // appId: process.env.REACT_APP_FIREBASE_APP_ID,
    // measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
    
    apiKey: 'AIzaSyDn_mGk2G-DqWB0lfJ-83tL_fCOVbfknoQ',
    authDomain: 'free-music-player-23c8e.firebaseapp.com',
    databaseUrl: 'https://free-music-player-23c8e-default-rtdb.firebaseio.com',
    projectId: 'free-music-player-23c8e',
    storageBucket: 'free-music-player-23c8e.appspot.com',
    messagingSenderId: '987512357874',
    appId: '1:987512357874:web:e3206c04fb94664a28e16b',
    measurementId: 'G-V0YG68W21R' 
})

export const auth = app.auth()
export const db = getFirestore(app)
export default app