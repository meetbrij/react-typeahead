const lightTheme = {
    palette: {
      type: 'light',
      primary: {
        main: '#171e3d'
      },
      secondary: {
        main: '#f50057',
      },
      custom: {
        hover: '#eee',
        border: '#eee',
        text: '#666',
        hoverText: '#222',
      }
    },
    overrides: {
      MuiInputLabel: {
        root: {
          '&$focused': {
            color: '#171e3d',
            fontWeight: "bold"
          },
        },
      },
      MuiInput: {
        underline: {
          '&:after': {
            borderBottomColor: '#171e3d',
          },
        }
      }
    },
    typography: {
      fontSize: 16,
      h3: {
        fontWeight: 700,
        fontSize: '2.2rem'
      },
      h4: {
        fontWeight: 700,
        fontSize: '1.75rem'
      },
      h5: {
        fontWeight: 500
      },
      h6: {
        fontWeight: 500
      }
    }
  }

  export default lightTheme;
