import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import About from '../Components/About'
import User from '../Components/User'
import App from '../Components/App'
import Registry from '../Components/Registry'

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact={true} path="/" component={Registry} />
                <Route exact={true} path="/about" component={About} />
                <Route exact={true} path="/user" component={User} />
                <Route exact={true} path="/dashboard" component={App} />
            </Switch>
        </BrowserRouter>
    )
}

export default AppRouter