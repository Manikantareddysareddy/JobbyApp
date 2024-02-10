import {Component} from 'react'

import {Switch, Route, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'

import ProtectedRoute from './components/ProtectedRoute'

import Jobs from './components/Jobs'

import NotFound from './components/NotFound'

import Home from './components/Home'

import JobItemDetails from './components/JobItemDetails'

import './App.css'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
class App extends Component {
  render() {
    return (
      <div className="bg-container">
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/jobs" component={Jobs} />
          <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </div>
    )
  }
}

export default App
