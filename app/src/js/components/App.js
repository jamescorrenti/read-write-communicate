import React from 'react';

import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import TitleBar from '../components/TitleBar'
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
      </div>
    </MuiThemeProvider>
  );
}
export default App;

