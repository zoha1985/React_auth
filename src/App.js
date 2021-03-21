import logo from './logo.svg';
import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import Home from './Component/Home/Home';
import Login from './Component/Login/Login';
import firebaseConfig from './Component/config';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Cards from './Component/Cards/Cards';
import NoMatch from './Component/NoMatch/NoMatch';
import SingleVaickel from './Component/SingleVaickel/SingleVaickel';
import { createContext, useState } from 'react';
import PrivateRoute from './Component/privateRoute/PrivateRoute';
import Destination from './Component/Destination/Destination';
import Blog from './Component/Blog/Blog';
import Contact from './Component/Contact/Contact';

 export const UserContext = createContext();

firebase.initializeApp(firebaseConfig);

function App() {
  const [logedinUser, setLogedinUser] = useState({});
  console.log("app is UserContext" , UserContext)
  return (
    <div >
      <UserContext.Provider value={[logedinUser, setLogedinUser]}>
         <Router>
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/cards">
          <Cards />
          </Route> 
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute  path="/singlevaickel/:id">
            <SingleVaickel />
          </PrivateRoute>
          <PrivateRoute  path="/destination">
            <Destination />
          </PrivateRoute>
          <PrivateRoute  path="/blog">
            <Blog />
          </PrivateRoute>
          <PrivateRoute  path="/contact">
            <Contact />
          </PrivateRoute>
          <Route exact path="/">
            <Home />
          </Route>
            <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
    </Router>
    </UserContext.Provider>
    </div>
  );
}

export default App;
