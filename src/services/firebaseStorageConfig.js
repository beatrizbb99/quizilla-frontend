import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCBnepzBQz51viJ7gKUtKIIMW643wYs9xI",
  authDomain: "flowing-gasket-421115.firebaseapp.com",
  projectId: "flowing-gasket-421115",
  storageBucket: "flowing-gasket-421115.appspot.com",
  messagingSenderId: "801596746754",
  appId: "1:801596746754:web:c487f809502f863b13cb1b"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };