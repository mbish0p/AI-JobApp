import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from '../Components/Login'
import About from '../Components/About'
import Dashboard from '../Components/Dashboard'
import User from '../Components/User'
import App from '../Components/App'

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact={true} path="/about" component={About} />
                <Route exact={true} path="/login" component={Login} />
                <Route exact={true} path="/user" component={User} />
                <Route exact={true} path="/" component={App} />
            </Switch>
        </BrowserRouter>
    )
}

export default AppRouter