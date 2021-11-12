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
  pageStock: {
    paddingTop: theme.spacing(5),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    backgroundColor: '#fff',
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
  const [stock, setStock] = useState('');
  const [selectedStock, setSelectedStock] = useState([]);
  const stockList = useRef(sortedStock);

  const handleTypeAheadInput = e => {
    // console.log("text input: ", e);
    setStock(e.target.value);
  }

  const handleTypeAheadClick = suggestedVal => {
    console.log("stock is: ", suggestedVal);
    setSelectedStock([...selectedStock, suggestedVal.symbol])
    setStock('');
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" className={classes.root}>
        <NavBar />
          <Typography component="div" className={classes.pageStock}>
            Type Ahead Component for searching stock ticker
            <TypeAhead
              key={"input"}
              options={stockList.current}
              value={stock}
              startAt={0}
              maxResult={10}
              onChange={handleTypeAheadInput}
              onClick={suggestedVal => { handleTypeAheadClick(suggestedVal)}}
              />
              {stock.name && <div component="div" className={classes.pageInfo}>
                User selected {stock.name}
              </div>}
          </Typography>
      </Container>
    </React.Fragment>
  );
}

export default Page;
