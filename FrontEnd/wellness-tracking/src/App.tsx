import { Routes, Route } from 'react-router-dom';
import './App.scss';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Home } from './containers/home-page/home-page';
import { LandingPage } from './containers/landing-page/landing-page';
// import {theme} from './theme'
import { Profile } from './components/profile/profile';


function App() {
  return (
    // <ThemeProvider theme={theme}>
    <div className="App">
      <Routes>
        <Route path='*' element={<LandingPage></LandingPage>}></Route>
        <Route path='home' element={<Home></Home>}></Route>
        <Route path='profile' element={<Profile></Profile>}></Route>
        <Route element={<div>Not found</div>}></Route>
      </Routes>
    </div>
    // </ThemeProvider>
  );
}

export default App;
