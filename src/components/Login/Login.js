
import { useContext, useState } from 'react';
import userEvent from '@testing-library/user-event';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './LoginManager';


function Login() {
  document.title = "Login";
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    password: '',
    email: '',
    photo: ''
  })

  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    handleGoogleSignIn()
      .then(res => {
        handleResponses(res, true);
      })
  }

  const signOut = () => {
    handleSignOut()
      .then(res => {
        handleResponses(res, false);
      })
  }

  const handleResponses = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if (redirect) {
      history.replace(from);
    }
  }

  const fbSignIn = () => {
    handleFbSignIn()
      .then(res => {
        handleResponses(res, true);
      })
  }





  const handleChange = (event) => {
    let isFieldValid = true;
    if (event.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);

    }
    if (event.target.name === 'password') {
      const isPasswordValid = event.target.value.length > 6;
      const isPasswordHasNumber = /\d{1}/.test(event.target.value);
      isFieldValid = (isPasswordValid && isPasswordHasNumber);
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);

    }

  }

  const handleSubmit = (event) => {
    //console.log(user.email, user.password);
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password)
        .then(res => {
          handleResponses(res, true);

        })


    }

    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          handleResponses(res, true);

        })

    }
    event.preventDefault();

  }

  return (
    <div style={{ textAlign: 'center' }}>
      {
        user.isSignedIn ? <button onClick={signOut}>Sign Out</button> :
          <button onClick={googleSignIn}>Sign In</button>
      }
      <br />
      <button onClick={fbSignIn}>Sign In With Facebook</button>
      {
        user.isSignedIn && <div>
          <p>Welcome, {user.name}</p>
          <p>You are signed in as, {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }

      <h1>OUR OWN AUTHENTICATION SYSTEM</h1>
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
      <label htmlFor="newUser">New User Sign Up</label>
      <form onSubmit={handleSubmit}>
        {newUser && <input name="name" onBlur={handleChange} placeholder="Your Name" type="text" />}
        <br />
        <input type="text" name="email" onBlur={handleChange} placeholder="Enter Your Email Here" required />
        <br />
        <input type="password" onBlur={handleChange} name="password" placeholder="Password" required />
        <br />
        <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'} />
      </form>
      <p style={{ color: 'red' }}>{user.error}</p>
      {
        user.success && <p style={{ color: 'green' }}>User {newUser ? 'Created' : 'Logged In'} Successfully.</p>
      }

    </div>
  );
}

export default Login;
