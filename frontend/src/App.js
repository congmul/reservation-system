import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios'
import Nav from './components/Nav'
import HotelList from './components/HotelList';

function App() {
  const [logged, setLogged] = useState('false');
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    (async () => {
        const {data} = await axios.get('http://localhost:8080/api/hotel'); // axios gives back {data: {}}
        console.log(data);
        setFeatured(data);
    })();
  }, []);

  const hotel = featured[0];
  console.log(hotel);
  return (
    
    <div>
      <Nav logged={logged}/>
      <Router>
          <Switch>
              <Route path="/" exact>
                  <>
                  <h1 className="p-2">Spinka</h1>
                  <HotelList hotels={featured}></HotelList>
                  
                  </>
              </Route>
          </Switch>
        </Router>
    </div>
  );
}

export default App;
