import { Routes, Route } from 'react-router-dom';
import './App.scss';
import { Home } from './containers/home-page/home-page';
import { LandingPage } from './containers/landing-page/landing-page';



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='*' element={<LandingPage></LandingPage>}></Route>
        <Route path='home' element={<Home></Home>}></Route>
      </Routes>
    </div>
  );
}

export default App;
