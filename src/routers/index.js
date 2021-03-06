import React from 'react'
import {HomeComponent} from '../components/pages/home'
import {Route,Switch} from 'react-router-dom'
import { HomeAdmin } from '../components/pages/admin';
const Routes = () =>(
    <Switch>
        <Route path="/"   exact={true}  component={HomeComponent}></Route>
        <Route path="/admin" component={HomeAdmin}></Route>
    </Switch>
);
export default Routes;
