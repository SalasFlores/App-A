import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import firebase from 'firebase';

import Navbar from './layout/Navbar';

import Routes from './Routes';
//import Login from './components/users/Login'

const firebaseConfig = {
  apiKey: "AIzaSyCUrdzU8hOjFpZHV2y65M1q9-rzMRwNtt8",
  authDomain: "miapp-4a36b.firebaseapp.com",
  databaseURL: "https://miapp-4a36b.firebaseio.com",
  projectId: "miapp-4a36b",
  storageBucket: "miapp-4a36b.appspot.com",
  messagingSenderId: "843758393154",
  appId: "1:843758393154:web:06be5def7bd34366999adb"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);



function App() {
  return (
    <Router> 
      <div className="container-fluid">
        <Navbar />
        <Routes />
       
      </div>
    </Router>
  );
}

export default App;
