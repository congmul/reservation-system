import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios'
import Nav from './components/Nav'
import Account from './pages/Account/Account';
import Home from './pages/Home/Home';
import Hotels from './pages/Hotels/Hotels';
import Reservation from './pages/Reservation/Reservation';
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
              <Route path="/hotels" exact>
                  <Hotels/>
              </Route>
          </Switch>
        </Router>
    </div>
  );
}

export default App;
