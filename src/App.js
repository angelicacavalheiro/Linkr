import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useState, useContext } from 'react';

export default function App() {
    return(
        <BrowserRouter>
        <Switch>

        <UserContext.Provider >

          <Route path="/sign-up" exact>
            <Sign-up />
          </ Route> 

          <Route path="/" exact>
            <Login />
          </ Route> 

          <Route path="/timeline" exact>
            <Timeline />
          </ Route>  

          <Route path="/my-posts" exact>
            <MyPosts />
          </ Route>

          <Route path="/user/:id" exact>
            <User />
          </ Route>

          <Route path="/hashtag/:hashtag" exact>
            <Hashtag />
          </ Route>

          <Route path="/my-likes" exact>
            <Hashtag />
          </ Route>
        
          </UserContext.Provider>

      </ Switch>       
    </ BrowserRouter>   
    )
}