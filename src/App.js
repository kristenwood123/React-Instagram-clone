import './App.css';
import React, { useState, useEffect } from 'react'
import Footer from './Footer'
import { db, auth } from './firebase'
import Post from './Post'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core'
import ImageUpload from './ImageUpload'
import Icons from './Icons'




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
  const [posts, setPosts] = useState([]);
  const classes = useStyles()
  
  const [open, setOpen] = useState(false)
  const [modalStyle] = useState(getModalStyle)
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [openSignIn, setOpenSignIn] = useState(false)

  // checks if you are loggin in or not
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //if user is loggined in....
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
    //this is where the code runs!! Code gets re-rendered everytime there is a change
    db.collection('posts').onSnapshot(snapshot => {
    //every time a new post is added
    setPosts(snapshot.docs.map(doc => ({
      id: doc.id,
      post: doc.data()
    })));
  });
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
    
    //close modal
    setOpen(false)
  }

  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message))
      //close modal
      setOpenSignIn(false)
  }

  return (
    <div className="app">   
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          >
          <div style={modalStyle} className={classes.paper}>
            <form className='app__signup'>
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
                <Button onClick={signUp} type='submit'>Sign up</Button>
            </form>   
          </div>
        </Modal>

        <Modal
          open={openSignIn}
          onClose={() => setOpenSignIn(false)}>

          <div style={modalStyle} className={classes.paper}>
            <form
            className='app__signup'>
            <center>
                <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt=""/>
              </center>
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
                onClick={signIn}
                type='submit'>Sign In</Button>
            </form>   
        </div>
      </Modal>
      
        <div className="app__header">
            <img 
            className='app__headerImage' 
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" 
            alt="Instagram logo"
            />
            <input 
            className='app__headerInput' 
            type="text" placeholder='Search'
            />
            <Icons />
            { user ? (
              <Button onClick={() => auth.signOut()}>Logout</Button>
            ) : (
              <div className="app__loginContainer">
                <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
                <Button onClick={() => setOpen(true)}>Sign Up</Button>
              </div>
            )}
          </div>
          
          <div className="app__posts">             
                {
                posts.map(({post, id}) => (
                    <Post 
                      username={post.username}
                      postId={id} 
                      user={user}
                      caption={post.caption} 
                      imageUrl={post.imageUrl} 
                      key={id}
                    />
                ))
              }           
        </div>
          {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ) : (
        <h3 className='app__uploadmsg'>Sorry you need to login to upload</h3>
      )}
      <Footer />
    </div>
  );
}

export default App;
