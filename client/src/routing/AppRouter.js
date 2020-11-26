import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import User from '../Components/User'
import Registry from '../Components/Registration'
import Login from '../Components/Login'
import Dashboard from '../Components/Dashboard';
import EmployeerLogin from '../Components/EmployeerLogin'
import EmployeerDashboard from '../Components/EmployeerDashboard'
import EmployeerProfile from '../Components/EmployeerProfile'
import EmployeerJobOfferProfile from '../Components/EmployeerJobOfferProfile'
import JobOfferMainCard from '../Components/JobOfferMainCard'
import UserProfile from '../Components/UserProfile'
import MainJobOfferPage from '../Components/MainJobOfferPage'

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
                <Route exact={true} path='/employeer/:name/offers' component={EmployeerJobOfferProfile} />
                <Route exact={true} path='/job-offers/:id' component={JobOfferMainCard} />
                <Route exact={true} path='/employee/:email/profile' component={UserProfile} />
                <Route exact={true} path='/job-offers' component={MainJobOfferPage} />
            </Switch>
        </BrowserRouter>
    )
}

export default AppRouter