import './sharedStyles/reset.css'
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { useState } from 'react';
import SignUpPage from './components/Signup/SignUpPage'
import LoginPage from './components/Login/LoginPage'
import TimelinePage from './components/Timeline/TimelinePage'
import MyPostsPage from './components/MyPosts/MyPostsPage'
import UserPage from './components/User/UserPage'
import HashtagPage from './components/Hashtag/HashtagPage'
import MyLikesPage from './components/MyLikes/MyLikesPage'
import MenuHeaderPage from './components/MenuHeader/MenuHeaderPage';
import SearchMobile from './components/MenuHeader/SearchMobile';
import ShowMenuContext from './contexts/ShowMenuContext';
import UserContext from './contexts/UserContext';
import { AnimatePresence } from 'framer-motion';
import AnimationContext from './contexts/AnimationContext';



export default function App() {

  const storedUser = JSON.parse(localStorage.getItem('storedUser'));
  const [showMenu , setShowMenu] = useState(false)
  const [user, setUser] = useState(storedUser);  
  const [following, setFollowing]=useState([]);
  const location = useLocation();
  
  const pageTransition = {
    in:{
        opacity: 1,
        y:0
    },
    out:{
        opacity: 0,
        y: '-100%'
    }
}
  
  function disappearMenu() { 
    if(showMenu === true){
      setShowMenu(!showMenu);
    }
   }

    return(     


        <UserContext.Provider value={{user, setUser}}>
          <AnimatePresence exitBeforeEnter>
              <Switch location={location} key={location.pathname}>
                <AnimationContext.Provider value={{pageTransition}}>

                  <ShowMenuContext.Provider value={{disappearMenu, setShowMenu, showMenu, setFollowing, following}}>
         
                    <Route path="/sign-up" exact>
                      <SignUpPage />
                    </ Route> 

                    <Route path="/" exact >              
                      {storedUser ? <Redirect to="/timeline"/> : <LoginPage /> }
                    </Route> 

                    <Route path="/timeline" exact>
                      <MenuHeaderPage />
                      <SearchMobile />
                      <TimelinePage />
                    </ Route>  

                    <Route path="/my-posts" exact>
                      <MenuHeaderPage />    
                      <SearchMobile />  
                      <MyPostsPage />
                    </ Route>

                    <Route path="/user/:id" exact>
                      <MenuHeaderPage />
                      <SearchMobile />
                      <UserPage />
                    </ Route>

                    <Route path="/hashtag/:hashtag" exact>
                      <MenuHeaderPage />
                      <SearchMobile />
                      <HashtagPage />
                    </ Route>

                    <Route path="/my-likes" exact>
                      <MenuHeaderPage />
                      <SearchMobile />
                      <MyLikesPage />
                    </ Route> 

                  </ShowMenuContext.Provider>
                </AnimationContext.Provider>
              </ Switch>
          </AnimatePresence>   
        </UserContext.Provider >    
  
    )
}
