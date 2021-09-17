import './sharedStyles/reset.css'
import { BrowserRouter, Switch, Route, Redirect  } from "react-router-dom";
import { useState } from 'react';
import SignUpPage from './components/Signup/SignUpPage'
import LoginPage from './components/Login/LoginPage'
import TimelinePage from './components/Timeline/TimelinePage'
import UserContext from './contexts/UserContext';
import MyPostsPage from './components/MyPosts/MyPostsPage'
import UserPage from './components/User/UserPage'
import HashtagPage from './components/Hashtag/HashtagPage'
import MyLikesPage from './components/MyLikes/MyLikesPage'
import MenuHeaderPage from './components/MenuHeader/MenuHeaderPage';
import ShowMenuContext from './contexts/ShowMenuContext';



export default function App() {
  const storedUser = JSON.parse(localStorage.getItem('storedUser'));
  const [user, setUser] = useState(storedUser);  
  const [showMenu , setShowMenu] = useState(false);

  function disappearMenu() { 
    if(showMenu === true){
      setShowMenu(!showMenu)
    }
   }

    return(     

      <BrowserRouter>
        <UserContext.Provider value={{user, setUser}}>
          <Switch>

          <ShowMenuContext.Provider value={{disappearMenu, setShowMenu, showMenu}}>
         
              <Route path="/sign-up" exact>
                <SignUpPage />
              </ Route> 

              <Route path="/" exact >              
                {storedUser ? <Redirect to="/timeline"/> : <LoginPage /> }
              </Route> 

              <Route path="/timeline" exact>
                <MenuHeaderPage />
                <TimelinePage />
              </ Route>  

              <Route path="/my-posts" exact>
                <MenuHeaderPage />      
                <MyPostsPage />
              </ Route>

              <Route path="/user/:id" exact>
                <MenuHeaderPage />
                <UserPage />
              </ Route>

              <Route path="/hashtag/:hashtag" exact>
                <MenuHeaderPage />
                <HashtagPage />
              </ Route>

              <Route path="/my-likes" exact>
                <MenuHeaderPage />
                <MyLikesPage />
              </ Route> 

            </ShowMenuContext.Provider>

          </ Switch>   
        </UserContext.Provider >    
      </ BrowserRouter>   
    )
}
