import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import User from '../Components/User'
import Registry from '../Components/Registration'
import Login from '../Components/Login'
import Dashboard from '../Components/Dashboard';
import EmployeerLogin from '../Components/EmployeerLogin'

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact={true} path="/" component={Registry} />
                <Route exact={true} path='/login' component={Login} />
                <Route exact={true} path="/user" component={User} />
                <Route exact={true} path="/dashboard" component={Dashboard} />
                <Route exact={true} path="/employeer/login" component={EmployeerLogin} />
            </Switch>
        </BrowserRouter>
    )
}

export default AppRouter