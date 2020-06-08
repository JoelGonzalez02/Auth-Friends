import React, { useState } from 'react';
import {Route, Switch} from 'react-router-dom';
import Login from './Login';
import FriendsList from './FriendsList';
import PrivateRoute from './PrivateRoute';
import HomePage from './HomePage';


const Main = () => {

    const [loggedState, setLoggedState] = useState(false || JSON.parse(localStorage.getItem('loggedState')))

    const logOut = () => {
        localStorage.removeItem('token')
        localStorage.setItem('loggedState', false)
    }

    return (
        <>
        <Switch>
            <PrivateRoute exact path='/protected' component={FriendsList} />
            <Route path='/login' render={props => <Login setLoggedState={setLoggedState} {...props}/>} />
            <Route path='/' render={props => <HomePage loggedState={loggedState} logOut={logOut} />} />
        </Switch>
        </>
    )
}

export default Main;

