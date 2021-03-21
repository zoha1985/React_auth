import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import FacebookIcon from '@material-ui/icons/Facebook';
import GTranslateIcon from '@material-ui/icons/GTranslate';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';

const Login = () => {
    const [logedinUser, setLogedinUser] = useContext(UserContext);
    console.log("top logedinUser", logedinUser);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success: false
    })


    const handelSubmit = (e) => {
        // console.log(user.email , user.password)
        if (newUser && user.email && user.password) {
            // console.log('sldfkjkfjks')
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(result => {
                    // Signed in 
                    var user = result.user;
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    updateUserInfo('what is user name', user.name)
                    setUser(newUserInfo);
                    
                    console.log(user)
                    // ...
                })
                .catch(error => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo)

                    console.log(errorMessage);
                });
        }
        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(result => {
                    var user = result.user;
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    setLogedinUser(newUserInfo);
                    history.replace(from);
                    console.log('dsfgkdjsfkgkjsdfg', result.user)


                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo)
                });
        }
        e.preventDefault();
    }
    const updateUserInfo = name => {
        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name,
            photoURL: "https://example.com/jane-q-user/profile.jpg"
        }).then(function () {
           console.log('user name update success fuley')
        }).catch(function (error) {
           console.log(error)
        });
    }
    // totle create form and validation
    let isFormValide = false;
    const handleBlur = (e) => {
        if (e.target.name === 'email') {
            isFormValide = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'password') {
            const isPassValid = e.target.value.length > 6;
            const isPasswordValid = /\d{3}/.test(e.target.value);
            isFormValide = isPassValid && isPasswordValid;
        }
        if (isFormValide) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }
    // facebook loging success
    const handalFbSignin = () => {
        const fbProvider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(fbProvider)
        .then((result) => {
          var credential = result.credential;
          var user = result.user;
          setUser(user);
          setLogedinUser(user);
          history.replace(from);
          console.log('fb user' , user);
        
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          var email = error.email;
          var credential = error.credential;

        });
    }

    // Login for google sign_in_provider
const handleGoogleSignin = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleProvider)
    .then((result) => {
        var credential = result.credential;
        var user = result.user;
        setUser(user);
        setLogedinUser(user);
        history.replace(from);
        console.log('fb user' , user);
    // history.replace(from)


  }).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
  });
}

   

    return (
        <div className="container align-center">
            <div className="row 100-vh">
                <div className="col-md-12">
                    <form onSubmit={handelSubmit}>
                        <h1>Our Own Othancation</h1>
                        <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
                        <label htmlFor="newUser" className="primary text-center fs-1 fw-bolder"> New User Signup</label>
                        <p style={{ color: "red" }}>{user.error}</p>
                        {
                            newUser && <input className="w-50" type="text" onBlur={handleBlur} name="firstName" id="" placeholder="Enter your name" required />

                        }
                        <br /> <br />
                        {
                            newUser && <input className="w-50" type="text" onBlur={handleBlur} name="secoundName" id="" placeholder="Enter your name" required />
                        }
                        <br /><br />
                        <input className="w-50" type="email" onBlur={handleBlur} name="email" id="" placeholder="Enter your email" required /> <br /> <br />
                        <input className="w-50" type="password" onBlur={handleBlur} name="password" id="" placeholder="Enter your pass" required /> <br /> <br />
                        <input className="w-50 bg-warning border-0" type="submit" value={ newUser ? "Sign Up" : "Sign in"} />
                    </form>
                    {user.success && <p style={{ color: "green" }}> User {newUser ? 'created' : 'Logined'} successfully</p>}

                    <br/>
                    <button className="btn-primary" onClick={handalFbSignin}>facebook  <FacebookIcon />  </button> &nbsp; &nbsp;
                    <button className="btn-primary" onClick={handleGoogleSignin}> Google <GTranslateIcon /> </button>
                </div>
            </div>
        </div>
    );
};

export default Login;