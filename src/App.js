import React from 'react';
import './App.css';
import { auth, db } from './firebase/init';
import { collection, addDoc, getDocs } from "firebase/firestore";
import Navbar from './components/Navbar';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut, 
  onAuthStateChanged
 } from "firebase/auth";

function App() {
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [authMessage, setAuthMessage] = React.useState('');

function createPost() {
  const post = {
    title: "Land a $100k job",
    description: "Finish Frontend Simplified"
  };
  addDoc(collection(db, "posts"), post)
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}

async function getAllPosts() {
  const { docs } = await getDocs(collection(db, "posts"));
  const posts = docs.map(elem => elem.data());
  console.log(posts);
}

React.useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    setLoading(false);
    if (user) {
      setUser(user);
      setAuthMessage('');
    } else {
      setUser({});
    }
  });
  return () => unsubscribe();
}, []);


  function register() {
      createUserWithEmailAndPassword(auth, 'email@example.com', 'password123')
        .then((user) => {
          console.log(user)
        })
        .catch((error) => {
          console.log(error)
        })
  }

  function login() {
    signInWithEmailAndPassword(auth, 'email@example.com', 'password123')
        .then(({ user }) => {
            console.log(user)
          setUser(user)
        })
        .catch((error) => {
          console.log(error)
        })
  }

  function logout() {
    signOut(auth);
}

return (
  <div className="App">
    <Navbar 
      user={user} 
      loading={loading} 
      onLogin={login} 
      onRegister={register} 
      onLogout={logout} 
      authMessage={authMessage}
      onCreatePost={createPost}
      getAllPosts={getAllPosts}
    />

  </div>
);
}

export default App;
