import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCX5N1bBLq_UAHc1qMkojJvNqsBOGKFSWI",
  authDomain: "faculty-feedback-8bd60.firebaseapp.com",
  projectId: "faculty-feedback-8bd60",
  storageBucket: "faculty-feedback-8bd60.appspot.com",
  messagingSenderId: "124165099708",
  appId: "1:124165099708:web:27e78ca886ce2b2aaac0b9",
  measurementId: "G-XCVNQ90ZS7"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const googleProvider= new GoogleAuthProvider();
export const emailJsConfig = {
  serviceId: 'service_ze02s2b',
  templateId: 'template_4od35ut',
  userEmail: 'saravanansrikanth1234@gmail.com',
};
export const db = getFirestore(app);
export const storage = getStorage(app);
