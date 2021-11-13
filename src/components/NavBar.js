import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/MenuBook';
import Box from '@mui/material/Box';
import DarkMode from '@mui/icons-material/DarkMode';
import LightMode from '@mui/icons-material/LightMode';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

const NavBar = () => {
    const classes = useStyles();

    const handleSelectPageTheme = (theme) => {
      const event = new CustomEvent("themeSelect", { detail: theme });
      document.dispatchEvent(event);
    }

    return(
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar variant="dense">
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit">
                React Type Ahead Component Demo
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Box>
                <IconButton
                  size="medium"
                  edge="end"
                  aria-label="dark theme for the page"
                  onClick={() => handleSelectPageTheme('dark')}
                  color="inherit"
                >
                  <DarkMode />
                </IconButton>
                <IconButton
                  size="medium"
                  edge="end"
                  aria-label="light theme for the page"
                  onClick={() => handleSelectPageTheme('light')}
                  color="inherit"
                >
                  <LightMode />
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>
        </div>
    )
}
export default NavBar;
