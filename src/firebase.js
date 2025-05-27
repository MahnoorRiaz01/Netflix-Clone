import { initializeApp } from "firebase/app";
import { 
    createUserWithEmailAndPassword, 
    getAuth,
    signInWithEmailAndPassword, 
    signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from 'firebase/firestore'; 
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBqJ1M1ufm1Y6TSEzlovqWq51uNuopotGY",
  authDomain: "netflix-clone-52f52.firebaseapp.com",
  projectId: "netflix-clone-52f52",
  storageBucket: "netflix-clone-52f52.firebasestorage.app",
  messagingSenderId: "368442113527",
  appId: "1:368442113527:web:b1cbc95060c7600554c2f2"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const db = getFirestore(app)

const signup = async (name, email ,password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth, email,password);
        const user = res.user;
        await addDoc(collection(db, 'user'),{
            uid: user.uid,
            name,
            authProvider: 'local',
            email,
            
        });
    } catch (error) {
        console.log(error);
         toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password)=>{
    try {
        await signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
        console.log(error);
         toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}
const logout = ()=>{
    signOut(auth);
}

export {auth, db, login,signup, logout}