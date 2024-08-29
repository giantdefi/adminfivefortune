import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {

	apiKey: "AIzaSyBnygvIgxnaJ1COLSFFTqO3VzqhFDzFVU8",
  
	authDomain: "fivefortune-c9df2.firebaseapp.com",
  
	projectId: "fivefortune-c9df2",
  
	storageBucket: "fivefortune-c9df2.appspot.com",
  
	messagingSenderId: "36946924277",
  
	appId: "1:36946924277:web:0fae07864bf83ab66cebbc"
  
  };
  
  
  
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);

