import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDuoOLwLvwTFdtlVP_Gs-cMaq68P17-1qQ",
    authDomain: "miniblog-fd7c7.firebaseapp.com",
    projectId: "miniblog-fd7c7",
    storageBucket: "miniblog-fd7c7.appspot.com",
    messagingSenderId: "342779082561",
    appId: "1:342779082561:web:fc8243eded966931a113c0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const db = getFirestore(app)


export {db}