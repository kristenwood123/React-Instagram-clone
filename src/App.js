import './App.css';
import React, { useState, useEffect } from 'react'
import Footer from './Footer'
import { db, auth } from './firebase'
import Post from './Post'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core'
const firebase = require('firebase/app')


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid lightgray',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const App = () => {
  const [posts, setPosts] = useState([])
  const classes = useStyles()
  
  const [open, setOpen] = useState(false)
  const [modalStyle] = useState(getModalStyle)
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
 
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
       console.log(authUser)
       setUser(authUser)
         //dont update usernmae
      } else {
        setUser(null)
      }
    })

    return () => {
      //perform some clean up actions
      unsubscribe()
    }
  }, [user, username])

  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
    //every time a new post is added
    setPosts(snapshot.docs.map(doc => ({
      id: doc.id,
      post: doc.data()
    })));
  })
}, [])

  const signUp = (e) => {
    e.preventDefault()

    auth
    .createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username,
      })
    })
    .catch((error) => alert(error.message))
  }

  return (
      <div className="app">
        <Modal
        open={open}
        onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form
          className='app__signup'>
            <center>
                <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt=""/>
              </center>
                <Input
                  placeholder='username'
                  type='username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                  placeholder='email'
                  type='text'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder='password'
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button 
                onClick={signUp}
                type='submit'>Sign up</Button>
          </form>   
        </div>
      </Modal>

        <div className="app__header">
          <img className='app__headerImage' src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="Instagram logo"/>
          <input type="text"/>
          </div>

          <Button onClick={() => setOpen(true)}>Sign up!</Button>
          

          {posts.map(({ post, id }) => (
            <Post 
              key={id}
              username={post.username}
              imageUrl={post.imageUrl}
              caption={post.caption}
            />
            ))
          }
          <div className="app__login">
            {/* <Login /> */}
            </div>
          
          {/* Posts */}
      <Footer />

  </div>
  
  );
}

export default App;
