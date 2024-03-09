// App.js
import React from 'react';
import CoinChart from './CoinChat';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './coindata.css';
function App() {
  return (
    <div >
     
      <nav className="navbar navbar-light  d-block">
        <h1 className='navbar text-center d-block'>
          Cryptocurrency Information Graph
        </h1>
      </nav>
      <CoinChart />
    </div>
  );
}

export default App;
