import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { login } from './features/userSlice';
import { auth } from './firebase';
import './login.css';

function Login() {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [name,setName] = useState('');
    const [profilepic,setProfilepic] = useState('');
    const dispatch = useDispatch();

    const loginToApp = (e) => {
        e.preventDefault();

        auth.signInWithEmailAndPassword(email,password)
        .then((userAuth) => {
            dispatch(
                login(
                    {
                        email: userAuth.user.email,
                        uid: userAuth.user.uid,
                        displayName: userAuth.user.displayName,
                        profileUrl: userAuth.user.photoURL,
                    }
                )
            )
        })
        .catch(err => alert(err));
    };

    const register  = (e) => {
        if(!name){
            return alert("Please Enter your full name");
        }
        auth.createUserWithEmailAndPassword(email,password)
        .then((userAuth) => {
            userAuth.user.updateProfile({
                displayName: name,
                photoURL: profilepic
            })
            .then(() => {
                dispatch(login({
                    email: userAuth.user.email,
                    uid: userAuth.user.uid,
                    displayName: name,
                    photoUrl: profilepic,
                }))
            })
        }).catch(err => alert(err))
    };

  return (
    <div className="login">
        <img src="https://www.pagetraffic.com/blog/wp-content/uploads/2022/09/linkedin-logo-768x188.png" alt="" />
        <form >
            <input type="text" placeholder='full name' value={name} onChange={(e) => {setName(e.target.value)}}/>
            <input type="text" placeholder='Profile pic url' value={profilepic} onChange={(e) => {setProfilepic(e.target.value)}}/>
            <input type="email" placeholder='email' value={email} onChange={(e) => {setEmail(e.target.value)}}/>
            <input type="password" placeholder='password' value={password} onChange={(e) => {setPassword(e.target.value)}}/>
            <button onClick={loginToApp}>Sign In</button>
        </form>
        <p>Not a member?{" "}
            <span className='login__register' onClick={register}> Register Now</span>
        </p>
    </div>
  )
}

export default Login