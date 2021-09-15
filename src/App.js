import './sharedStyles/reset.css'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useState, useContext } from 'react';
import SignUpPage from './components/Signup/SignUpPage'
import LoginPage from './components/Login/LoginPage'
import TimelinePage from './components/Timeline/TimelinePage'
import MyPostsPage from './components/MyPosts/MyPostsPage'
import UserPage from './components/User/UserPage'
import HashtagPage from './components/Hashtag/HashtagPage'
import MyLikesPage from './components/MyLikes/MyLikesPage'
import MenuHeader from './components/MenuHeader/MenuHeader';
import ShowMenuContext from './contexts/ShowMenuContext';

export default function App() {

  const[showMenu , setShowMenu] = useState(false)

    return(     

      <BrowserRouter>
        <Switch>

          <Route path="/sign-up" exact>
            <SignUpPage />
          </ Route> 

          <Route path="/" exact>
            <LoginPage />
          </ Route> 

          <ShowMenuContext.Provider value={{showMenu, setShowMenu}}>

            <Route path="/timeline" exact>
              <MenuHeader />
              <TimelinePage />
            </ Route>  

            <Route path="/my-posts" exact>
              <MenuHeader />
              <MyPostsPage />
            </ Route>

            <Route path="/user/:id" exact>
              <MenuHeader />
              <UserPage />
            </ Route>

            <Route path="/hashtag/:hashtag" exact>
              <MenuHeader />
              <HashtagPage />
            </ Route>

            <Route path="/my-likes" exact>
              <MenuHeader />
              <MyLikesPage />
            </ Route> 

          </ShowMenuContext.Provider>

  

        </ Switch>       
      </ BrowserRouter>   
    )
}