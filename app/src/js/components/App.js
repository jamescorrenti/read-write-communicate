import React from 'react';

import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import TitleBar from '../components/TitleBar'
import Footer from '../components/Footer'
import { rwcTheme } from './rwcTheme'

const divStyle = {
  display: 'flex'
};

function App({children}) {
  return (
    <MuiThemeProvider theme={rwcTheme}>
      <div style={divStyle}>
        <CssBaseline />
        <TitleBar />
        { children }
        <Footer />
      </div>
    </MuiThemeProvider>
  );
}
export default App;

