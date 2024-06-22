// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBnepzBQz51viJ7gKUtKIIMW643wYs9xI",
  authDomain: "flowing-gasket-421115.firebaseapp.com",
  projectId: "flowing-gasket-421115",
  storageBucket: "flowing-gasket-421115.appspot.com",
  messagingSenderId: "801596746754",
  appId: "1:801596746754:web:c487f809502f863b13cb1b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };