import React, {useState, useRef} from 'react';
import NavBar from './components/NavBar';
import TypeAhead from './components/TypeAhead';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Stocks from './data/Stocks'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: 'left',
  },
  pageLabel: {
    paddingTop: theme.spacing(5),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    backgroundColor: '#e3e3e3',
    height: '100vh'
  },
  pageStock: {
    paddingTop: theme.spacing(5),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    backgroundColor: '#e3e3e3',
    height: '100vh'
  },
}));

const sortedStock = Stocks.sort(( a, b ) => {
  if ( a.symbol < b.symbol ){
    return -1;
  }
  if ( a.symbol > b.symbol ){
    return 1;
  }
  return 0;
});

function Page() {
  const classes = useStyles();
  const [stock, setStock] = useState([]);
  const stockList = useRef(sortedStock);

  const handleTypeAheadInput = e => {
    console.log("text input: ", e);
  }

  const handleTypeAheadClick = suggestedVal => {
    console.log("stock is: ", suggestedVal);
    setStock(suggestedVal);
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" className={classes.root}>
        <NavBar />
          <Typography component="div" className={classes.pageLabel}>
            Type Ahead Component for searching stock ticker
            <TypeAhead
              key={"input"}
              options={stockList.current}
              // value={stock}
              onChange={handleTypeAheadInput}
              onClick={suggestedVal => { handleTypeAheadClick(suggestedVal)}}
              />
              <div component="div" className={classes.pageInfo}>
                User selected {stock}
              </div>
          </Typography>
      </Container>
    </React.Fragment>
  );
}

export default Page;
