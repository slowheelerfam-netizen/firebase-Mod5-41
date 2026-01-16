import React from 'react';
import './App.css';
import { auth, db } from './firebase/init';
import { collection, addDoc, getDocs, getDoc, doc, query, where, updateDoc } from "firebase/firestore";
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

async function updatePost() {
  const hardcodedId = '2UBr2D5ekRaAxREmsIq0';
  const postRef = doc(db, "posts", hardcodedId);
  const post = await getPostById(hardcodedId);
  console.log(post);
  const newPost= {
    ...post,
    title: "Land a $400k job",  //This line will only update this field
  };
  console.log(newPost);
  updateDoc(postRef, newPost);
}

function createPost() {
  const post = {
    title: "Finish Interview Section",
    description: "Do Frontend Simplified",
    uid: user.uid, 
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
  const posts = docs.map(elem => ({...elem.data(), id: elem.id}));
  console.log(posts);
}

async function getPostById(id) {
  const postRef = doc(db, "posts", id);
  const postSnap = await getDoc(postRef);
  return postSnap.data();   
}

async function getPostByUid() {
  const postCollectionRef = await query(
    collection(db, "posts"),
    where("uid", "==", user.uid)
  );
  const { docs } = await getDocs(postCollectionRef);
  console.log(docs)
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
      getPostById={getPostById}
      getPostByUid={getPostByUid}
      updatePost={updatePost}
    />

  </div>
);
}

export default App;
