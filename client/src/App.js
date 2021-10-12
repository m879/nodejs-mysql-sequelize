import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import UserForm from './components/Form';
import AllUser from './components/AllUser';

export default function() {
  return (
      <BrowserRouter>
        <div>
            <Switch>
             <Route path="/" component={UserForm} exact/>
             <Route path="/users" component={AllUser}/>
           </Switch>
        </div> 
      </BrowserRouter>
  )
}
