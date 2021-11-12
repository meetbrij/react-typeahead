import React from 'react';
import NavBar from './components/NavBar'
import TypeAhead from './components/TypeAhead'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: 'left',
  },
  menuPageLabel: {
    paddingTop: theme.spacing(5),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    backgroundColor: '#e3e3e3',
    height: '100vh'
  },
}));

function Page() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" className={classes.root}>
        <NavBar />
          <Typography component="div" className={classes.menuPageLabel}>
            Type Ahead Component for searching stock ticker
            <TypeAhead />
          </Typography>

      </Container>
    </React.Fragment>
  );
}

export default Page;
