import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat',
    fontSize: 16
  },
  palette: {
    primary: {
      main: 'rgb(92, 200, 155)',
      contrastText: 'rgb(255, 255, 255)'
    },
    error: {
      main: 'rgb(235, 92, 100)'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          fontWeight: 700,
          textTransform: 'none',
          '&.MuiButton-sizeLarge': {
            height: 64
          },
          '&.MuiButton-containedPrimary:hover': {
            backgroundColor: 'rgba(92, 200, 155, 0.8)'
          }
        }
      },
      variants: [
        {
          props: { variant: 'rounded' },
          style: {
            borderRadius: 32,
            backgroundColor: 'rgb(56, 56, 56)',
            color: 'rgb(255, 255, 255)',
            '&:hover': {
              backgroundColor: 'rgba(56, 56, 56, 0.8)'
            }
          }
        },
        {
          props: { variant: 'rounded', color: 'primary' },
          style: {
            backgroundColor: 'rgb(92, 200, 155)',
            '&:hover': {
              backgroundColor: 'rgba(92, 200, 155, 0.8)'
            }
          }
        },
        {
          props: { variant: 'rounded-outlined' },
          style: {
            borderRadius: 32,
            borderColor: 'rgb(56, 56, 56)',
            borderWidth: 1,
            borderStyle: 'solid',
            color: 'rgb(56, 56, 56)',
            backgroundColor: 'rgb(255, 255, 255)',
            '&:hover': {
              borderColor: 'rgb(56, 56, 56)',
              color: 'rgb(56, 56, 56)',
              backgroundColor: 'rgba(56, 56, 56, 0.04)'
            }
          }
        },
        {
          props: { variant: 'rounded-outlined', color: 'primary' },
          style: {
            borderColor: 'rgb(92, 200, 155)',
            color: 'rgb(92, 200, 155)',
            '&:hover': {
              borderColor: 'rgb(92, 200, 155)',
              color: 'rgb(92, 200, 155)',
              backgroundColor: 'rgba(92, 200, 155, 0.04)'
            }
          }
        }
      ]
    }
  }
});

export default theme;
