import React from 'react';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import TitleBar from '../containers/TitleBar'

const muiTheme = createMuiTheme({
  overrides: {
    // Title Bar
    MuiAppBar: {      
      colorPrimary: {
        backgroundColor: '#ffffff',
      },
      positionFixed: {
         zIndex: 1201, //theme.zIndex.drawer + 1,
      },
    },
    MuiFab: {   // User Menu Button
      root: {
        textTransform: 'none',
        backgroundColor: '#3B4B63',
        color: '#FFFFFF',
      }
    },
    MuiSvgIcon: {  // Use Menu Button icons
      root: {
        fontSize: '36px',
        padding: '10px'
      }
    },
    MuiButton: { // Signin button
      contained: {
        backgroundColor: '#0D8087',
        color: '#FFFFFF'
      }
    },

 }
});

const divStyle = {
  display: 'flex'
};

function App({children}) {
  return (
    <MuiThemeProvider theme={muiTheme}>
      <div style={divStyle}>
        <CssBaseline />
        <TitleBar />
        { children }
      </div>
    </MuiThemeProvider>
  );
}
export default App;

