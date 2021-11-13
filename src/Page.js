import React, {useState, useRef, useEffect} from 'react';
import NavBar from './components/NavBar';
import TypeAhead from './components/TypeAhead';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Stocks from './data/Stocks'
import { ThemeProvider } from '@material-ui/core/styles';
import { createTheme } from '@material-ui/core/styles';
import lightTheme from './themes/ThemeNavy';
import darkTheme from './themes/ThemeMaroon';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: 'left',
  },
  pageStock: {
    paddingTop: theme.spacing(5),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    height: '100vh',
  },
  pageInfo: {
    paddingTop: theme.spacing(3)
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
  const [userTheme, setUserTheme] = useState('light')

  const selectTheme = ({ detail }) => {
    setUserTheme(detail);
  };

  const appliedTheme = createTheme(userTheme === "light" ? lightTheme : darkTheme)

  useEffect(() => {
    document.addEventListener("themeSelect", selectTheme);
    return () => {
      document.removeEventListener("themeSelect", selectTheme);
    }
  });

  const handleTypeAheadInput = userInputValue => {
    setStock(userInputValue);
  }

  const handleTypeAheadClick = (suggestedVal, chips, type) => {
    console.log("stock is: ", suggestedVal);
    // if(chips !== undefined) {
    if(type === "multiSelect") {
      setSelectedStock(chips);
      setStock('');
    } else {
      setSelectedStock([...selectedStock, suggestedVal.symbol]);
      setStock(suggestedVal.name);
    }
  }

  const handleClear = () => {
    setSelectedStock([]);
    setStock('');
  }

  return (
    <ThemeProvider theme={appliedTheme}>
      <CssBaseline />
      <Container maxWidth="md" className={classes.root}>
        <NavBar />
        <Typography component="div" className={classes.pageStock}>
          Type Ahead Component for searching stock ticker
          <TypeAhead
            key={"input"}
            options={stockList.current}
            value={stock}
            startAt={0}
            maxResult={10}
            inputPattern="[A-Za-z]+"
            type="multiSelect"
            onTextChange={handleTypeAheadInput}
            onChange={(suggestedVal, chips, type) => { handleTypeAheadClick(suggestedVal, chips, type)}}
            onClear={handleClear}
            />
            {selectedStock.length > 0 && <div component="div" className={classes.pageInfo}>
              User selection: {selectedStock.map(stock => <span>{stock}, </span>)}
            </div>}
        </Typography>
      </Container>
    </ThemeProvider>
  );
}

export default Page;
