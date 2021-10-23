import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios'
import Nav from './components/Nav'
import HotelList from './components/HotelList';
import SignForm from './components/SignForm/SignForm';

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
      <Nav logged={logged}/>
      <Router>
          <Switch>
              <Route path="/" exact>
                  <>
                  <h1 className="p-2">Spinka Hotels</h1>
                  <HotelList hotels={featured}/>
                  <SignForm />
                  </>
              </Route>
          </Switch>
        </Router>
    </div>
  );
}

export default App;
