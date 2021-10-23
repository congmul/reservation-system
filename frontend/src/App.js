import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios'
import Nav from './components/Nav'
import HotelList from './components/HotelList';
import Account from './pages/Account/Account';

const App = () => {
  const [logged, setLogged] = useState(false);
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    (async () => {
        const {data} = await axios.get('http://localhost:8080/api/hotel');
        console.log(data);
        setFeatured(data);
    })();
  }, []);
  
  return (
    <div>
      <Router>
        <Nav logged={logged}/>
          <Switch>
              <Route path="/" exact>
                  <>
                  <h1 className="p-2">Spinka Hotels</h1>
                  <HotelList hotels={featured}/>
                  </>
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
