import logo from './logo.svg';
import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config'
import { useState } from 'react';
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function App() {
  const  provider = new firebase.auth.GoogleAuthProvider();
  const [user, setUser] = useState({
    isSignedIn: false,
    name : '',
    email : '',
    photoURL: ''
  });
  const handerSignIn = () => {
    firebase.auth().signInWithPopup(provider)
    .then((result) => {
      console.log(result.user)
      const {displayName,email,photoURL} = result.user;    
      setUser({
        isSignedIn:true,
        name:displayName,
        email:email,
        photoURL:photoURL
      }) 
    }).catch((error) => {
      console.log(error)
    });
  }

  const handerSignOut = () => {
    firebase.auth().signOut().then(() => {
       setUser({
        isSignedIn: false,
        name : '',
        email : '',
        photoURL: ''
      })
      }).catch((error) => {
        console.log(error)
      });
    
  }

  return (
    <div className="App">
      {
        user.isSignedIn ?  <button onClick={handerSignOut} >Google Logout</button> : <button onClick={handerSignIn} >Google Login</button>
      }
      
      {
        user.isSignedIn ? <div>
          <h4>{user.name}</h4>
          <h4>{user.email}</h4>
          <img src={user.photoURL} alt='img' />
        </div> : <div>Please login</div>
      }
    </div>
  );
}

export default App;
