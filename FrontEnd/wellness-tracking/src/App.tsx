import { Routes, Route } from 'react-router-dom';
import './App.scss';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Home } from './containers/home-page/home-page';
import { LandingPage } from './containers/landing-page/landing-page';
// import {theme} from './theme'
import { Profile } from './components/profile/profile';
import Navbar from './components/navbar/navbar';
import { CustomerTabs, ProfessionalTabs } from './models/tabs';
import { useState } from 'react';
import { getUserDetails } from './services/user.service';
import { Search } from './components/search/search';


function App() {
  
  // const userDetails = getUserDetails();
  const [tabs, setTabs] = useState<any>(CustomerTabs);

  return (
    // <ThemeProvider theme={theme}>
    <div className="App" style={{ display: 'flex' }}>

      {tabs && <Navbar tabs={tabs}></Navbar>}
      <div className="app-right-pane" style={{width:'100%'}}>
        <Routes>
          <Route path='*' element={<LandingPage></LandingPage>}></Route>
          <Route path='dashboard' element={<Home></Home>}></Route>
          <Route path='profile' element={<Profile></Profile>}></Route>
          {/* <Route path='search' element={<Search/>}></Route> */}
          <Route element={<div>Not found</div>}></Route>
        </Routes>
      </div>

    </div>
    // </ThemeProvider>
  );
}

export default App;
