import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import GroupList from './components/GroupList';

function App() {
  return (
    <CookiesProvider>
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/groups' exact={true} component={GroupList}/>
          </Switch>
        </Router>
      </CookiesProvider>
  );
}

export default App;
