import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import { LandingPage } from './containers/landing-page/landing-page';


function App() {

  return (
    <BrowserRouter>
    <div className="App">
      <LandingPage></LandingPage>
    </div>
    </BrowserRouter>
  );
}

export default App;
