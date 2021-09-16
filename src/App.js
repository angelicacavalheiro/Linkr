import './sharedStyles/reset.css'
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
// import { useState, useContext } from 'react';
import SignUpPage from './components/Signup/SignUpPage'
import LoginPage from './components/Login/LoginPage'
import TimelinePage from './components/Timeline/TimelinePage'
import { useState } from 'react';
import UserContext from './contexts/UserContext';
// import MyPostsPage from './components/MyPosts/MyPostsPage'
// import UserPage from './components/User/UserPage'
// import HashtagPage from './components/Hashtag/HashtagPage'
// import MyLikesPage from './components/MyLikes/MyLikesPage'

// import { useState, useContext } from 'react';

export default function App() {

  const storedUser = JSON.parse(localStorage.getItem('storedUser'));

  const [user, setUser] = useState(storedUser);
    return(
      <BrowserRouter>
        <UserContext.Provider value={{user, setUser}}>
          <Switch>
            <Route path="/sign-up" exact>
            <SignUpPage />
            </Route> 
            <Route path="/" exact>
            {user ? <Redirect to="/timeline"/> : <LoginPage/> }
            </Route> 

            <Route path="/timeline" exact>
              <TimelinePage />
            </Route>  

            {/*
            <Route path="/my-posts" exact>
              <MyPostsPage />
            </ Route>

            <Route path="/user/:id" exact>
              <UserPage />
            </ Route>

            <Route path="/hashtag/:hashtag" exact>
              <HashtagPage />
            </ Route>

            <Route path="/my-likes" exact>
              <MyLikesPage />
            </ Route> */}

          </Switch>
        </UserContext.Provider>       
      </BrowserRouter>   
    )
}