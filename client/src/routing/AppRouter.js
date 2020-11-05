import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import User from '../Components/User'
import Registry from '../Components/Registration'
import Login from '../Components/Login'
import Dashboard from '../Components/Dashboard';
import EmployeerLogin from '../Components/EmployeerLogin'
import EmployeerDashboard from '../Components/EmployeerDashboard'
import EmployeerProfile from '../Components/EmployeerProfile'

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact={true} path="/" component={Registry} />
                <Route exact={true} path='/login' component={Login} />
                <Route exact={true} path="/user" component={User} />
                <Route exact={true} path="/dashboard" component={Dashboard} />
                <Route exact={true} path="/employeer" component={EmployeerLogin} />
                <Route exact={true} path='/employeer/:name' component={EmployeerDashboard} />
                <Route exact={true} path='/employeer/:name/company-profile' component={EmployeerProfile} />
            </Switch>
        </BrowserRouter>
    )
}

export default AppRouter