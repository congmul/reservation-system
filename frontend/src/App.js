import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios'
import Nav from './components/Nav'
import Account from './pages/Account/Account';
import Home from './pages/Home/Home';
import './App.css';

const App = () => {
  const [logged, setLogged] = useState(false);
  
  return (
    <div>
      <Router>
        <Nav logged={logged}/>
          <Switch>
              <Route path="/" exact>
                  <Home/>
              </Route>
              <Route path="/account" exact>
                <Account />
              </Route>
          </Switch>
        </Router>
    </div>
  );
}

export default App;
