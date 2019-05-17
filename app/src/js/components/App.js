import React from 'react';

import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter } from 'react-router-dom';

import SideMenu from './SideMenu';
import ContentArea from '../components/ContentArea'
import TitleBar from '../components/TitleBar'
import Footer from '../components/Footer'

import { rwcTheme } from '../styles/rwcTheme'
import getRoutes from '../routes'

const divStyle = {
  display: 'flex'
};

function App({children}) {
  return (
    <MuiThemeProvider theme={rwcTheme}>
      <div style={divStyle}>
        <CssBaseline />
        <BrowserRouter>
          <TitleBar />
          <SideMenu />
          <ContentArea>
            {getRoutes()}
          </ContentArea>    
        </BrowserRouter>    
        <Footer />
      </div>
    </MuiThemeProvider>
  );
}
export default App;

