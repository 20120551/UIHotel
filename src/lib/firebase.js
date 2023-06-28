import { initializeApp } from 'firebase/app';
import { getStorage } from "firebase/storage";


// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyCuH6m8ysWJ1hzeCwfbKBAIqkQSjJZ9Mtg",
    authDomain: "hotelmanagement-a67f9.firebaseapp.com",
    projectId: "hotelmanagement-a67f9",
    storageBucket: "hotelmanagement-a67f9.appspot.com",
    messagingSenderId: "282231947850",
    appId: "1:282231947850:web:0853cdbbf0989313051cb3"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
