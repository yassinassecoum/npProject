
import React, { Component } from 'react'
import Home from './Components/Home/Home'
import Dormir from './Components/Dormir/Dormir'
import Decouvrir from './Components/Decouvrir/Decouvrir';
import Login from './Components/Login/Login';
import Vienocturne from './Components/Vienocturne/Vienocturne';
import Restaurants from './Components/Restaurants/Restaurants';
import { BrowserRouter, Switch, Route } from "react-router-dom";

export class App extends Component {
  render() {
    return (
      
      <BrowserRouter>
        <Switch>
          <Route component={Home} exact path="/" />
          <Route component={Login}  path="/login" />
          <Route component={Dormir} path="/dormir" />
          <Route component={Decouvrir} path="/decouvrir" />
          <Route component={Restaurants} path="/restaurants" />
          <Route component={Vienocturne} path="/vienocturne" />
         
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
