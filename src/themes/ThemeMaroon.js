const darkTheme = {
    palette: {
      type: 'dark',
      primary: {
        main: '#250414',
      },
      secondary: {
        main: '#f5a900',
      },
      custom: {
        hover: '#888',
        text: '#f5a900',
        hoverText: '#eee',
        border: '#888'
      }
    },
    overrides: {
      MuiInputLabel: {
        root: {
          '&$focused': {
            color: '#f5a900',
            fontWeight: "bold"
          },
        },
      },
      MuiInput: {
        underline: {
          '&:after': {
            borderBottomColor: '#f5a900',
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

  export default darkTheme;
