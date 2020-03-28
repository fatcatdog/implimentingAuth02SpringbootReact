import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import GroupList from './components/GroupList';
import Group from './components/Group';
import Invitations from './components/Invitations';

function App() {
  return (
    <CookiesProvider>
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Home} />
            <Route path='/groups' exact={true} component={GroupList} />
            <Route path='/group' exact={true} component={Group} />
            <Route path='/invitations' exact={true} component={Invitations} />
          </Switch>
        </Router>
      </CookiesProvider>
  );
}

export default App;
