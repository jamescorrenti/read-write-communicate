
import { createMuiTheme } from '@material-ui/core/styles';


export const rwcTheme = createMuiTheme({
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
    // Tables
    MuiTable: {
      root: {
        tableLayout: "auto"
      }
    },
    MuiTableRow: {
      root: {
        "&:nth-of-type(odd)": {
          backgroundColor: "#FAFAFA"
        }
      },     
    },
    MuiTableCell: {
      head: {
        color: '#ffffff',
        backgroundColor: '#3B4B63',        
      }
    },
 }
});



