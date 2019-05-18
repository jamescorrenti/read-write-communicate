
import { createMuiTheme } from '@material-ui/core/styles';
// chicken and egg.  In rwcTheme, want to reference the palette colors
// but they don't seem to be know yet...
import { colors } from './colors'

export const rwcTheme = createMuiTheme({
  palette: {
    primary: {
      main: colors.primary,
      light: colors.grey
    },
    secondary: {
      main: colors.secondary
    },
  },
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
        backgroundColor: colors.secondary,
        color: colors.textContrast,
      },
    },
    MuiSvgIcon: {  // Use Menu Button icons
      root: {
        fontSize: '36px',
        padding: '10px'
      }
    },
    MuiButton: { // Signin button
      contained: {
        backgroundColor: colors.primary,
        color: colors.textContrast
      },
      root: {
        margin: '5px',     
      }
    },
    MuiDialogTitle: { // Signin Dialog
      root: {
        display: 'flex',
        justifyContent: 'center'
      }
    },
    // Buttons and Icons
    MuiSvgIcon: {
      root: {
        fill:  '#6EBB91' /* '#0D8087' */
      }
    },
    // Tables
    MuiTable: {
      root: {
        tableLayout: 'auto'
      }
    },
    MuiTableRow: {
      root: {
        '&:nth-of-type(odd)': {
          backgroundColor: '#FAFAFA'
        }
      },     
    },
    MuiTableCell: {
      head: {
        color: colors.textContrast,
        backgroundColor: colors.secondary,        
      },
      body: {
        fontSize: '14px'
      }
    },
 }
});



